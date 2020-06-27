import ArgumentDatadb from "./liveClassData/argument";
import InfoDatadb from "./liveClassData/info";
import QuoteDatadb from "./classData/quote";
import QuotesDatadb from "./classData/quotes";
import SourceDatadb from "./classData/source";
import SourcesDatadb from "./classData/sources";

import QuoteTbl from "./elements/quoteTbl";
import QuotesTbl from "./elements/quotesTbl";
import SourceTbl from "./elements/sourceTbl";
import SourcesTbl from "./elements/sourcesTbl";
import Info from "./elements/infoTbl";
import Quote from "./elements/quoteTbl";

import argumentData from "./data/argument";
import SourcesData from "./data/sources";
import SourceData from "./data/source";
import QuotesData from "./data/quotes";
import QuoteData from "./data/quote";
import InfoTbl from "./elements/infoTbl";
import ArgumentTbl from "./elements/argumentTbl";

export interface Argument {
  id: number;
  title: string;
  info: Info;
  generalnotes: string;
}
export interface Source {
  id: number;
  title: string;
  link: string;
  quotes: Quote[];
  notes: string;
}
export interface ArgumentViewData {
  argument: Argument;
  sources: Source[];
}

export default class ArgumentViewdb {
  private _data!: ArgumentViewData;
  private id: number;
  private currentArgument!: ArgumentTbl;

  private _argumentTable = new ArgumentDatadb();
  private _infoTable = new InfoDatadb();
  private _quoteTable = new QuoteDatadb(this.refreshData.bind(this));
  private _quotesTable = new QuotesDatadb(this.refreshData.bind(this));
  private _sourceTable = new SourceDatadb(this.refreshData.bind(this));
  private _sourcesTable = new SourcesDatadb(this.refreshData.bind(this));

  constructor(argid: number) {
    this.id = argid;
  }

  async refreshData() {
    this.currentArgument = await this._argumentTable.getSingle(this.id);

    const arg = await this.getArgument();
    const sources = await this.getSources();

    this._data = {
      argument: arg,
      sources: sources,
    };
  }

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

    await this.refreshData();
  }
  async addSource(title: string, link: string, notes: string) {
    link = this.checkLink(link);

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

    await this.refreshData();
  }

  async updateInfo(desc: string, current: string, counter: string) {
    const infoid = this.currentArgument.infoid;

    const info: InfoTbl = {
      id: infoid,
      description: desc,
      current: current,
      counter: counter,
    };

    await this._infoTable.update(info);

    await this.refreshData();
  }
  async updateGeneralNotes(notes: string) {
    const updated = await this._argumentTable.getSingle(this.id);
    updated.generalnotes = notes;

    await this._argumentTable.update(updated);

    await this.refreshData();
  }
  async updateSource(
    link: string,
    quotes: QuoteTbl[],
    notes: string,
    sourceid: number,
  ) {
    link = this.checkLink(link);

    const currentSource = await this._sourceTable.getSingle(sourceid);
    currentSource.link = link;
    currentSource.notes = notes;
    await this._sourceTable.update(currentSource, sourceid);

    for (let i = 0; i < quotes.length; i++) {
      const q = quotes[i];
      await this._quoteTable.update(q, q.id);
    }

    await this.refreshData();
  }

  checkLink(link: string) {
    const httpsCheck = link.substring(0, 8) === "https://";
    const httpCheck = link.substring(0, 7) === "http://";

    if (!httpsCheck && !httpCheck && link !== "") {
      link = "https://" + link;
    }

    return link;
  }

  private async getArgument(): Promise<Argument> {
    const infoData = await this._infoTable.getSingle(
      this.currentArgument.infoid,
    );

    return new Promise((resolve, reject) => {
      resolve({
        id: this.currentArgument.id,
        title: this.currentArgument.title,
        info: infoData,
        generalnotes: this.currentArgument.generalnotes,
      });
    });
  }

  private getSources(): Promise<Source[]> {
    return new Promise((resolve, reject) => {
      const sourceids = SourcesData.filter((s) => s.argumentid === this.id).map(
        (s) => s.sourceid,
      );
      const sources = SourceData.filter((s) => sourceids.includes(s.id));

      const returnSources: Source[] = sources.map((s) => {
        const quoteids = QuotesData.filter((q) => q.sourceid === s.id).map(
          (q) => q.id,
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

  get data() {
    return this._data;
  }
  get argument() {
    return this._data.argument;
  }
  get sources() {
    return this._data.sources;
  }
}
