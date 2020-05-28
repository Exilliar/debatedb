import Info from "./elements/infoTbl";
import debates from "./data/debate";
import info from "./data/info";
import argumentData from "./data/argument";
import DebateTbl from "./elements/debateTbl";
import ArgumentTbl from "./elements/argumentTbl";

interface Debate {
  id: number;
  title: string;
  info: Info;
  generalNotes: string;
}
interface Argument {
  id: number;
  title: string;
  description: string;
}
interface ArgumentsViewData {
  debate: Debate;
  arguments: Argument[];
}

export default class ArgumentsView {
  private _data!: ArgumentsViewData;
  private id: number;

  get data() {
    return this._data;
  }
  get debate() {
    return this._data.debate;
  }
  get arguments() {
    return this._data.arguments;
  }

  constructor(debateid: number) {
    this.init(debateid);
    this.id = debateid;
  }

  private async init(debateid: number) {
    const debate = await this.getDebate(debateid);
    const args = await this.getArguments();

    this._data = {
      debate: debate,
      arguments: args,
    };
  }

  private getDebate(id: number): Promise<Debate> {
    return new Promise((resolve, reject) => {
      resolve(
        debates
          .filter((d) => d.id === id)
          .map((d) => {
            return {
              id: d.id,
              title: d.title,
              info: info.filter((i) => i.id === d.infoid)[0],
              generalNotes: d.generalNotes,
            };
          })[0]
      );
    });
  }

  private getArguments(): Promise<Argument[]> {
    return new Promise((resolve, reject) => {
      resolve(
        argumentData.map((a) => {
          return {
            id: a.id,
            title: a.title,
            description: a.description,
          };
        })
      );
    });
  }

  // no add debate is needed as a debate cannot be added from this view
  updateDebate(debate: DebateTbl, id: number) {
    this.rawDebates[id] = debate;
    this.init(this.id);
  }
  addArgument(arg: ArgumentTbl) {
    this.rawArguments.push(arg);
    this.init(this.id);
  }
  updateArgument(arg: ArgumentTbl, id: number) {
    this.rawArguments[id] = arg;
    this.init(this.id);
  }

  // This part will be replaced when the backend is made
  rawDebates = debates;
  rawArguments = argumentData;
}
