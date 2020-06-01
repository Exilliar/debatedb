import Info from "./elements/infoTbl";
import Quote from "./elements/quoteTbl";

import argumentData from "./data/argument";
import infoData from "./data/info";

import SourcesData from "./data/sources";
import SourceData from "./data/source";
import QuotesData from "./data/quotes";
import QuoteData from "./data/quote";
import ArgumentDatadb from "./classData/argument";
import InfoDatadb from "./classData/info";
import QuoteDatadb from "./classData/quote";
import QuotesDatadb from "./classData/quotes";
import QuoteTbl from "./elements/quoteTbl";
import QuotesTbl from "./elements/quotesTbl";
import SourceDatadb from "./classData/source";
import SourcesDatadb from "./classData/sources";
import SourceTbl from "./elements/sourceTbl";
import SourcesTbl from "./elements/sourcesTbl";

interface Argument {
  id: number;
  title: string;
  info: Info;
  generalNotes: string;
}
export interface Source {
  id: number;
  title: string;
  link: string;
  quotes: Quote[];
  notes: string;
}
interface ArgumentViewData {
  argument: Argument;
  sources: Source[];
}

export default class ArgumentViewdb {
  private _data!: ArgumentViewData;
  private id: number;

  private _argumentTable = new ArgumentDatadb(this.refreshData.bind(this));
  private _infoTable = new InfoDatadb(this.refreshData.bind(this));
  private _quoteTable = new QuoteDatadb(this.refreshData.bind(this));
  private _quotesTable = new QuotesDatadb(this.refreshData.bind(this));
  private _sourceTable = new SourceDatadb(this.refreshData.bind(this));
  private _sourcesTable = new SourcesDatadb(this.refreshData.bind(this));

  async addQuote(text: string, additional: string, sourceid: number) {
    const addQuote: QuoteTbl = {
      id: this._quoteTable.size(),
      text: text,
      additional: additional,
    };
    await this._quoteTable.add(addQuote);

    const addQuotes: QuotesTbl = {
      id: this._quotesTable.size(),
      sourceid: sourceid,
      quoteid: this._quoteTable.size() - 1,
    };
    await this._quotesTable.add(addQuotes);
  }
  async addSource(title: string, link: string, notes: string) {
    const sourceid = this._sourceTable.size();

    const newSource: SourceTbl = {
      id: sourceid,
      title: title,
      link: link,
      notes: notes,
    };

    await this._sourceTable.add(newSource);

    const newSources: SourcesTbl = {
      id: this._sourcesTable.size(),
      argumentid: this.id,
      sourceid: sourceid,
    };

    await this._sourcesTable.add(newSources);
  }

  async updateInfo(desc: string, current: string, counter: string) {
    const infoid = this._argumentTable.getSingle(this.id).infoid;

    const info = this._infoTable.getSingle(infoid);
    info.description = desc;
    info.current = current;
    info.counter = counter;

    await this._infoTable.update(info, infoid);
  }
  async updateGeneralNotes(notes: string) {
    const updated = this._argumentTable.getSingle(this.id);
    updated.generalNotes = notes;

    await this._argumentTable.update(updated, this.id);
  }
  async updateSource(
    link: string,
    quotes: QuoteTbl[],
    notes: string,
    sourceid: number
  ) {
    const currentSource = await this._sourceTable.getSingle(sourceid);
    currentSource.link = link;
    currentSource.notes = notes;
    await this._sourceTable.update(currentSource, sourceid);

    for (let i = 0; i < quotes.length; i++) {
      const q = quotes[i];
      await this._quoteTable.update(q, q.id);
    }
  }

  get data() {
    return this._data;
  }
  get argument() {
    return this._data.argument;
  }
  get sources() {
    return this._data.sources;
  }

  constructor(argid: number) {
    this.id = argid;
  }

  async refreshData() {
    const arg = await this.getArgument();
    const sources = await this.getSources();

    this._data = {
      argument: arg,
      sources: sources,
    };
  }

  private getArgument(): Promise<Argument> {
    return new Promise((resolve, reject) => {
      resolve(
        argumentData
          .filter((a) => a.id === this.id)
          .map((a) => {
            return {
              id: a.id,
              title: a.title,
              info: infoData.filter((i) => i.id === a.infoid)[0],
              generalNotes: a.generalNotes,
            };
          })[0]
      );
    });
  }

  private getSources(): Promise<Source[]> {
    return new Promise((resolve, reject) => {
      const sourceids = SourcesData.filter((s) => s.argumentid === this.id).map(
        (s) => s.sourceid
      );
      const sources = SourceData.filter((s) => sourceids.includes(s.id));

      const returnSources: Source[] = sources.map((s) => {
        const quoteids = QuotesData.filter((q) => q.sourceid === s.id).map(
          (q) => q.id
        );

        const quotes = QuoteData.filter((q) => quoteids.includes(q.id));

        return {
          id: s.id,
          title: s.title,
          link: s.link,
          quotes: quotes,
          notes: s.notes,
        };
      });

      resolve(returnSources);
    });
  }
}
