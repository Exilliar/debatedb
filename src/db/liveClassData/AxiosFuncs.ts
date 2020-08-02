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
  axios = Axios.create({
    baseURL: this.baseUrl,
    responseType: "json",
    headers: {
      "Content-Type": "application/json",
    },
  });

  getAll(endpoint: string): Promise<Table[]> {
    return new Promise((resolve) => {
      this.axios.get<GetRes<Table[]>>(endpoint).then((res) => {
        resolve(res.data.data);
      });
    });
  }
  getSingle(endpoint: string): Promise<Table> {
    return new Promise((resolve) => {
      this.axios.get<GetRes<Table>>(endpoint).then((res) => {
        resolve(res.data.data);
      });
    });
  }
  add(endpoint: string, newDebate: AddTable): Promise<number> {
    return new Promise((resolve) => {
      this.axios.post<AddRes>(endpoint, newDebate).then((res) => {
        resolve(+res.data.newid);
      });
    });
  }
  update(endpoint: string, updateDebate: Table): Promise<void> {
    return new Promise((resolve) => {
      this.axios.put(endpoint, updateDebate).then(() => {
        resolve();
      });
    });
  }
  delete(endpoint: string): Promise<void> {
    return new Promise((resolve) => {
      this.axios.delete(endpoint).then(() => {
        resolve();
      });
    });
  }
}
