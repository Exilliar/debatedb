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
    return new Promise((resolve, reject) => {
      this._data[id] = newData;
      this.refresh().then(() => resolve());
    });
  }
  add(newData: T) {
    return new Promise((resolve, reject) => {
      this._data.push(newData);
      this.refresh().then(() => resolve());
    });
  }
  getSingle(id: number) {
    return this._data[id];
  }
  size() {
    return this._data.length;
  }
}
