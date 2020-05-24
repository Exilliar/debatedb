import IDebate from "../elements/debate";
import DeafultTable from "./defaultTable";
import DebateData from "../data/debates";

export default class Debates extends DeafultTable<IDebate> {
  constructor() {
    super(DebateData);
  }
}
