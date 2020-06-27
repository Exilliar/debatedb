import DebateDatadb from "./liveClassData/debate";
import InfoDatadb from "./liveClassData/info";

import store from "@/store";

export interface Debate {
  id: number;
  title: string;
  description: string;
}
type DebatesViewData = Debate;

export default class DebatesViewdb {
  private _data!: DebatesViewData[];

  private _debateTable = new DebateDatadb();
  private _infoTable = new InfoDatadb();

  refreshData(): Promise<DebatesViewData[]> {
    return new Promise((resolve, reject) => {
      this.getDebates().then((d) => {
        this._data = d;
        resolve(this._data);
      });
    });
  }

  async add(title: string, description: string) {
    const newInfoid = await this._infoTable.add({
      description: "",
      current: "",
      counter: "",
    });

    await this._debateTable.add({
      title: title,
      description: description,
      generalnotes: "",
      infoid: newInfoid,
      accountid: store.state.account.id,
    });

    await this.refreshData();
  }

  private async getDebates(): Promise<Debate[]> {
    const debateData = await this._debateTable.getAll(store.state.account.id);

    return new Promise((resolve, reject) => {
      // Should eventually be call to a db view
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
