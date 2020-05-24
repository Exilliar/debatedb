import Filter from "./filter.model";

export default interface dummyDB<T> {
  readonly data: T[];
  select: () => T[];
  add: (toAdd: T) => T[]; // Returns the data array that has the new value
  update: (index: number, newVal: T) => T[]; // Returns the data array that has the updated value
}
