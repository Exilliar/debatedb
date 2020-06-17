import DebateDatadb from "./classData/debate";
import InfoDatadb from "./classData/info";

import BaseViewClass from "./BaseViewClass";

import store from "@/store";

export interface Debate {
  id: number;
  title: string;
  description: string;
}
type DebatesViewData = Debate;

export default class DebatesViewdb implements BaseViewClass {
  private _data!: DebatesViewData[];

  private _debateTable = new DebateDatadb(this.refreshData.bind(this));
  private _infoTable = new InfoDatadb(this.refreshData.bind(this));

  refreshData(): Promise<DebatesViewData[]> {
    return new Promise((resolve, reject) => {
      this.getDebates().then((d) => {
        this._data = d;
        resolve(this._data);
      });
    });
  }

  async deleteViewCard(id: number) {
    // console.log("deleting", id);

    const debate = await this._debateTable.getSingle(id);
    const infoid = debate.infoid;

    await this._infoTable.delete(infoid);
    await this._debateTable.delete(+id); // no idea what's going on here. Without the + id gets passed in as... idk, not a number (or a string)

    const debates = await this._debateTable.get();
    const infos = await this._infoTable.get();

    // console.log("data:", this.data);
    // console.log("debates:", debates);
    // console.log("infos:", infos);
  }

  async add(title: string, description: string) {
    await this._infoTable.add({
      id: this._infoTable.size(),
      description: "",
      current: "",
      counter: "",
    });

    await this._debateTable.add({
      id: this._debateTable.size(),
      title: title,
      description: description,
      generalNotes: "",
      infoid: this._infoTable.size() - 1,
      userid: store.state.user.id,
    });
  }

  private async getDebates(): Promise<Debate[]> {
    const debateData = await this._debateTable.get();
    console.log("debateData:", debateData);

    return new Promise((resolve, reject) => {
      // Should eventually be call to db view
      resolve(
        debateData.map((d) => {
          return {
            id: d.id,
            title: d.title,
            description: d.description,
          };
        })
      );
    });
  }

  get data() {
    return this._data;
  }
}
