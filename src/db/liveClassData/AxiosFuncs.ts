import Axios from "axios";

interface GetRes<T> {
  data: T;
}
interface AddRes {
  newid: string;
}

export default class AxiosFuncs<Table, AddTable> {
  baseUrl = process.env.NODE_ENV === "production"
    ? "https://api.debatedb.com/"
    : "http://localhost:4000/";

  getAll(endpoint: string): Promise<Table[]> {
    return new Promise((resolve) => {
      Axios.get<GetRes<Table[]>>(this.baseUrl + endpoint).then((res) => {
        resolve(res.data.data);
      });
    });
  }
  getSingle(endpoint: string): Promise<Table> {
    return new Promise((resolve) => {
      Axios.get<GetRes<Table>>(this.baseUrl + endpoint).then((res) => {
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
