import Base from "./base.model";
import DebateTbl from "../elements/debateTbl";
import Axios from "axios";

interface ReqRes<T> {
  data: T;
}
interface AddDebateTbl {
  title: string;
  description: string;
  generalNotes: string;
  infoId: number;
  accountId: number;
}

export default class DebateDatadb implements Base<DebateTbl> {
  data = new Array<DebateTbl>();
  baseUrl = "http://localhost:4000/account/";
  endpoint = this.baseUrl + "debate/";

  getAll(accountid: number): Promise<DebateTbl[]> {
    return new Promise((resolve) => {
      Axios.get<ReqRes<DebateTbl[]>>(this.baseUrl + accountid + "/debate")
        .then((res) => {
          resolve(res.data.data);
        });
    });
  }
  getSingle(debateid: number): Promise<DebateTbl> {
    return new Promise((resolve) => {
      Axios.get<ReqRes<DebateTbl>>(this.endpoint + debateid)
        .then((res) => {
          resolve(res.data.data);
        });
    });
  }
  update(updateDebate: DebateTbl): Promise<void> {
    return new Promise((resolve) => {
      Axios.put(this.endpoint + updateDebate.id, updateDebate)
        .then((res) => {
          resolve();
        });
    });
  }
  add(newDebate: AddDebateTbl): Promise<void> {
    return new Promise((resolve) => {
      Axios.post(this.endpoint, newDebate)
        .then((res) => {
          console.log(res);
          resolve();
        });
    });
  }
  delete(debateid: number): Promise<void> {
    return new Promise((resolve) => {
      Axios.delete(this.endpoint + debateid)
        .then((res) => {
          resolve();
        });
    });
  }
}
