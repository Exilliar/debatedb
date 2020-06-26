export default interface Base<T> {
  data: T[];
  baseUrl: string;
  endpoint: string;

  getAll(id?: number): Promise<T[]>;
  getSingle(id: number): Promise<T>;
  update(newData: T): Promise<void>;
  add(newData: T): Promise<void>;
  delete(id: number): Promise<void>;
}
