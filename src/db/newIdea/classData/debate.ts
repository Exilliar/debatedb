import TableBase from "./TableBase";
import DebateTbl from "../elements/debateTbl";
import DebateData from "../data/debate";

export default class DebateDatadb extends TableBase<DebateTbl> {
  constructor(refresh: () => Promise<any>) {
    super(DebateData, refresh);
  }
}
