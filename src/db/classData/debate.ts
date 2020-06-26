import TableBase from "./TableBase";
import DebateTbl from "../elements/debateTbl";
import DebateData from "../data/debate";

import store from "@/store";

export default class DebateDatadb extends TableBase<DebateTbl> {
  constructor(refresh: () => Promise<any>) {
    super(DebateData, refresh);
  }

  get(): Promise<DebateTbl[]> {
    return new Promise((resolve) => {
      resolve(DebateData.filter((d) => d.accountId === store.state.account.id));
    });
  }
}
