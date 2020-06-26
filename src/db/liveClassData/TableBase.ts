import Axios from "axios";

export default class TableBase {
  baseUrl = "http://localhost:4000/";
  endpoint: string;

  constructor(ep: string) {
    this.endpoint = this.baseUrl + ep;
  }

  getAll() {
    return new Promise((resolve) => {
      Axios.get(this.endpoint).then((res) => {
        resolve(res.data.data);
      });
    });
  }
  getSingle(id: number) {
    return new Promise((resolve) => {
      Axios.get(this.endpoint + "/" + id).then((res) => {
        resolve(res.data.data);
      });
    });
  }
}
