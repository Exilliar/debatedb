import DebateData from "./classData/debate";

interface Debate {
  id: number;
  title: string;
  description: string;
}
type DebatesViewData = Debate;

export default class DebatesView {
  private _data!: DebatesViewData[];

  private _debateTable = new DebateData(this.refreshData.bind(this));
  // private _infoTable = new InfoData(this.refreshData);

  get debateTable() {
    return this._debateTable;
  }

  get data() {
    return this._data;
  }

  refreshData(): Promise<DebatesViewData[]> {
    return new Promise((resolve, reject) => {
      this.getDebates().then((d) => {
        this._data = d;
        resolve(this._data);
      });
    });
  }

  private getDebates(): Promise<Debate[]> {
    return new Promise((resolve, reject) => {
      // Should eventually be call to db view
      resolve(
        this._debateTable.data.map((d) => {
          return {
            id: d.id,
            title: d.title,
            description: d.description,
          };
        })
      );
    });
  }
}
