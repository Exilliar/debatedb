import Info from "./elements/infoTbl";
import DebateDatadb from "./classData/debate";
import ArgumentDatadb from "./classData/argument";
import InfoDatadb from "./classData/info";
import DebateTbl from "./elements/debateTbl";

export interface Debate {
  id: number;
  title: string;
  info: Info;
  generalNotes: string;
}
export interface Argument {
  id: number;
  title: string;
  description: string;
}
export interface ArgumentsViewData {
  debate: Debate;
  arguments: Argument[];
}

export default class ArgumentsViewdb {
  private _data!: ArgumentsViewData;
  private debateid: number;
  private currentDebate!: DebateTbl;

  private _debateTable = new DebateDatadb(this.refreshData.bind(this));
  private _argumentTable = new ArgumentDatadb(this.refreshData.bind(this));
  private _infoTable = new InfoDatadb(this.refreshData.bind(this));

  get data() {
    return this._data;
  }

  async addArgument(title: string, description: string) {
    await this._infoTable.add({
      id: this._infoTable.size(),
      description: "",
      current: "",
      counter: "",
    });

    await this._argumentTable.add({
      id: this._argumentTable.size(),
      title: title,
      description: description,
      generalNotes: "",
      infoid: this._infoTable.size() - 1,
      debateid: this.debateid,
    });
  }

  async updateInfo(description: string, current: string, counter: string) {
    const infoid = this.currentDebate.infoid;

    const info = this._infoTable.getSingle(infoid);
    info.description = description;
    info.current = current;
    info.counter = counter;

    await this._infoTable.update(info, infoid);
  }

  async updateGeneralNotes(notes: string) {
    const updated = this.currentDebate;
    updated.generalNotes = notes;

    await this._debateTable.update(updated, this.debateid);
  }

  constructor(debateid: number) {
    this.debateid = debateid;
    this.currentDebate = this._debateTable.getSingle(this.debateid);
  }

  async refreshData() {
    const debate = await this.getDebate();
    const args = await this.getArguments();

    this._data = {
      debate: debate,
      arguments: args,
    };
  }

  private getDebate(): Promise<Debate> {
    return new Promise((resolve) => {
      resolve({
        id: this.currentDebate.id,
        title: this.currentDebate.title,
        generalNotes: this.currentDebate.generalNotes,
        info: this._infoTable.getSingle(this.currentDebate.infoid),
      });
    });
  }

  private getArguments(): Promise<Argument[]> {
    return new Promise((resolve) => {
      resolve(
        // This will be a view in the real db
        this._argumentTable.data
          .filter((a) => a.debateid === this.debateid)
          .map((a) => {
            return {
              id: a.id,
              title: a.title,
              description: a.description,
            };
          })
      );
    });
  }
}
