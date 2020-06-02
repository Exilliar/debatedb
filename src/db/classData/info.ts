import TableBase from "./TableBase";
import InfoTbl from "../elements/infoTbl";
import InfoData from "../data/info";

export default class InfoDatadb extends TableBase<InfoTbl> {
  constructor(refresh: () => Promise<any>) {
    super(InfoData, refresh);
  }
}
