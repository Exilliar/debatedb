export default class DeafultTable<T> {
  private data: T[];

  constructor(d: T[]) {
    this.data = d;
  }

  select() {
    return this.data;
  }

  add(toAdd: T) {
    this.data.push(toAdd);

    return this.data;
  }
  update(index: number, newVal: T) {
    this.data[index] = newVal;

    return this.data;
  }
}
