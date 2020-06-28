import ArgumentTbl, { AddArgumentTbl } from "../elements/argumentTbl";
import AxiosFuncs from "./AxiosFuncs";

export default class ArgumentDatadb {
  private standardEndpoint = "debate/argument/";
  private axiosFuncs = new AxiosFuncs<ArgumentTbl, AddArgumentTbl>();

  async getAll(debateid: number): Promise<ArgumentTbl[]> {
    return await this.axiosFuncs.getAll("debate/" + debateid + "/argument");
  }
  async getSingle(argumentid: number): Promise<ArgumentTbl> {
    return await this.axiosFuncs.getSingle(this.standardEndpoint + argumentid);
  }
  async add(newArgument: AddArgumentTbl): Promise<number> {
    return await this.axiosFuncs.add(this.standardEndpoint, newArgument);
  }
  async update(updateArgument: ArgumentTbl): Promise<void> {
    return await this.axiosFuncs.update(
      this.standardEndpoint + updateArgument.id,
      updateArgument,
    );
  }
  async delete(argumentid: number): Promise<void> {
    return await this.axiosFuncs.delete(this.standardEndpoint + argumentid);
  }
}
