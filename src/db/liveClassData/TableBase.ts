import Axios from "axios";

interface ReqRes<T> {
  data: T;
}
interface AddRes {
  newid: string;
}

export default class TableBase<Table, AddTable> {
  baseUrl = "http://localhost:4000/";

  getAll(endpoint: string): Promise<Table[]> {
    return new Promise((resolve) => {
      Axios.get<ReqRes<Table[]>>(this.baseUrl + endpoint).then((res) => {
        resolve(res.data.data);
      });
    });
  }
  getSingle(endpoint: string): Promise<Table> {
    return new Promise((resolve) => {
      Axios.get<ReqRes<Table>>(this.baseUrl + endpoint).then((res) => {
        resolve(res.data.data);
      });
    });
  }
  add(endpoint: string, newDebate: AddTable): Promise<number> {
    return new Promise((resolve) => {
      Axios.post<AddRes>(this.baseUrl + endpoint, newDebate).then((res) => {
        resolve(+res.data.newid);
      });
    });
  }
  update(endpoint: string, updateDebate: Table): Promise<void> {
    return new Promise((resolve) => {
      Axios.put(this.baseUrl + endpoint, updateDebate).then(() => {
        resolve();
      });
    });
  }
  delete(endpoint: string): Promise<void> {
    return new Promise((resolve) => {
      Axios.delete(this.baseUrl + endpoint).then(() => {
        resolve();
      });
    });
  }
}
