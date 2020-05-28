import Info from "./elements/infoTbl";
import Quote from "./elements/quoteTbl";

import argumentData from "./data/argument";
import infoData from "./data/info";

import SourcesData from "./data/sources";
import SourceData from "./data/source";
import QuotesData from "./data/quotes";
import QuoteData from "./data/quote";
import ArgumentTbl from "./elements/argumentTbl";
import SourceTbl from "./elements/sourceTbl";
import QuoteTbl from "./elements/quoteTbl";

interface Argument {
  id: number;
  title: string;
  info: Info;
  generalNotes: string;
}
interface Source {
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

export default class ArgumentView {
  private _data!: ArgumentViewData;
  private id: number;

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
    this.init(argid);
    this.id = argid;
  }

  private async init(id: number) {
    const arg = await this.getArgument(id);
    const sources = await this.getSources(id);

    this._data = {
      argument: arg,
      sources: sources,
    };
  }

  private getArgument(id: number): Promise<Argument> {
    return new Promise((resolve, reject) => {
      resolve(
        argumentData
          .filter((a) => a.id === id)
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

  private getSources(argid: number): Promise<Source[]> {
    return new Promise((resolve, reject) => {
      const sourceids = SourcesData.filter((s) => s.argumentid === argid).map(
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

  updateArgument(arg: ArgumentTbl) {
    this.rawArgument[this.id] = arg;
    this.init(this.id);
  }

  addSource(source: SourceTbl) {
    this.rawSource.push(source);
    this.rawSources.push({
      id: this.rawSources.length,
      argumentid: this.id,
      sourceid: source.id,
    });
    this.init(this.id);
  }
  updateSource(source: SourceTbl, id: number) {
    this.rawSource[id] = source;
    this.init(this.id);
  }

  addQuote(quote: QuoteTbl, source: SourceTbl) {
    this.rawQuote.push(quote);
    this.rawQuotes.push({
      id: this.rawQuotes.length,
      sourceid: source.id,
      quoteid: quote.id,
    });
    this.init(this.id);
  }
  updateQuote(quote: QuoteTbl, id: number) {
    this.rawQuote[id] = quote;
    this.init(this.id);
  }

  // This part will be replaced when the backend is made
  rawArgument = argumentData;
  rawSources = SourcesData;
  rawSource = SourceData;
  rawQuotes = QuotesData;
  rawQuote = QuoteData;
}
