import IArgument from "../elements/argument";
import DeafultTable from "./defaultTable";
import argumentData from "../data/arguments";

export default class Arguments extends DeafultTable<IArgument> {
  constructor() {
    super(argumentData);
  }
}
