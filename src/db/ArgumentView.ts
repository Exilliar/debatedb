import ArgumentDatadb from "./liveClassData/argument";
import InfoDatadb from "./liveClassData/info";
import QuoteDatadb from "./liveClassData/quote";
import SourceDatadb from "./liveClassData/source";

import QuoteTbl from "./elements/quoteTbl";
import InfoTbl from "./elements/infoTbl";
import ArgumentTbl from "./elements/argumentTbl";

export interface Argument {
  id: number;
  title: string;
  info: InfoTbl;
  generalnotes: string;
}
export interface Source {
  id: number;
  title: string;
  link: string;
  quotes: QuoteTbl[];
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
  private _quoteTable = new QuoteDatadb();
  private _sourceTable = new SourceDatadb();

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
    await this._quoteTable.add({
      text: text,
      additional: additional,
      sourceid: sourceid,
    });

    await this.refreshData();
  }
  async addSource(title: string, link: string, notes: string) {
    link = this.checkLink(link);

    await this._sourceTable.add({
      title: title,
      link: link,
      notes: notes,
      argumentid: this.currentArgument.id,
    });

    await this.refreshData();
  }

  async deleteQuote(id: number) {
    await this._quoteTable.delete(id);
  }
  async deleteSource(id: number) {
    await this._sourceTable.delete(id);
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
    await this._sourceTable.update(currentSource);

    for (let i = 0; i < quotes.length; i++) {
      const q = quotes[i];
      await this._quoteTable.update(q);
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

    return new Promise((resolve) => {
      resolve({
        id: this.currentArgument.id,
        title: this.currentArgument.title,
        info: infoData,
        generalnotes: this.currentArgument.generalnotes,
      });
    });
  }

  private async getSources(): Promise<Source[]> {
    const rawSources = await this._sourceTable.getAll(this.currentArgument.id);

    const sources = new Array<Source>();

    for (let i = 0; i < rawSources.length; i++) {
      const s = rawSources[i];

      const quotes = await this._quoteTable.getAll(s.id);

      sources.push({
        id: s.id,
        title: s.title,
        link: s.link,
        quotes: quotes,
        notes: s.notes,
      });
    }

    return sources;
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
