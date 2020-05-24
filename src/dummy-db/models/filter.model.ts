export default interface Filter<T> {
  key: string;
  value: T;
  operator: "<" | "<=" | ">" | ">=" | "===";
}
