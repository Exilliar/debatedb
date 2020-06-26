import Axios from "axios";

interface ReqRes<T> {
  data: T;
}

export default class TableBase<Table, AddTable> {
  baseUrl = "http://localhost:4000/";

  getAll(endpoint: string): Promise<Table[]> {
    return new Promise((resolve) => {
      Axios.get<ReqRes<Table[]>>(this.baseUrl + endpoint)
        .then((res) => {
          resolve(res.data.data);
        });
    });
  }
  getSingle(endpoint: string): Promise<Table> {
    return new Promise((resolve) => {
      Axios.get<ReqRes<Table>>(this.baseUrl + endpoint)
        .then((res) => {
          resolve(res.data.data);
        });
    });
  }
  update(endpoint: string, updateDebate: Table): Promise<void> {
    return new Promise((resolve) => {
      Axios.put(this.baseUrl + endpoint, updateDebate)
        .then((res) => {
          resolve();
        });
    });
  }
  add(endpoint: string, newDebate: AddTable): Promise<void> {
    return new Promise((resolve) => {
      Axios.post(this.baseUrl + endpoint, newDebate)
        .then((res) => {
          console.log(res);
          resolve();
        });
    });
  }
  delete(endpoint: string): Promise<void> {
    return new Promise((resolve) => {
      Axios.delete(this.baseUrl + endpoint)
        .then((res) => {
          resolve();
        });
    });
  }
}
