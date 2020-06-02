import TableBase from "./TableBase";
import SourcesTbl from "../elements/sourcesTbl";
import SourcesData from "../data/sources";

export default class SourcesDatadb extends TableBase<SourcesTbl> {
  constructor(refresh: () => Promise<any>) {
    super(SourcesData, refresh);
  }
}
