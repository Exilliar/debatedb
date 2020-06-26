import DebateDatadb from "./classData/debate";
import InfoDatadb from "./classData/info";

import store from "@/store";

export interface Debate {
  id: number;
  title: string;
  description: string;
}
type DebatesViewData = Debate;

export default class DebatesViewdb {
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
      infoId: this._infoTable.size() - 1,
      accountId: store.state.account.id,
    });
  }

  private async getDebates(): Promise<Debate[]> {
    const debateData = await this._debateTable.get();

    return new Promise((resolve, reject) => {
      // Should eventually be call to db view
      resolve(
        debateData.map((d) => {
          return {
            id: d.id,
            title: d.title,
            description: d.description,
          };
        }),
      );
    });
  }

  get data() {
    return this._data;
  }
}
