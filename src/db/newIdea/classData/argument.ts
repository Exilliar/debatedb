import TableBase from "./TableBase";
import ArgumentTbl from "../elements/argumentTbl";
import ArgumentData from "../data/argument";

export default class ArgumentDatadb extends TableBase<ArgumentTbl> {
  constructor(refresh: () => Promise<any>) {
    super(ArgumentData, refresh);
  }
}
