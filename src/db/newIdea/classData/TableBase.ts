export default class TableBase<T> {
  private _data: T[];
  private refresh: () => Promise<any>;

  constructor(d: T[], refr: () => Promise<any>) {
    this._data = d;
    this.refresh = refr;
  }

  get data() {
    return this._data;
  }

  update(newData: T, id: number) {
    return new Promise(async (resolve, reject) => {
      this._data[id] = newData;
      await this.refresh();
      resolve();
    });
  }
  add(newData: T) {
    return new Promise(async (resolve, reject) => {
      this._data.push(newData);
      await this.refresh();
      resolve();
    });
  }
}
