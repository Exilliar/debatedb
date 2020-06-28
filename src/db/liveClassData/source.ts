import SourceTbl, { AddSourceTbl } from "../elements/sourceTbl";
import AxiosFuncs from "./AxiosFuncs";

export default class SourceDatadb {
  private standardEndpoint = "argument/source/";
  private axiosFuncs = new AxiosFuncs<SourceTbl, AddSourceTbl>();

  async getAll(argumentid: number): Promise<SourceTbl[]> {
    return await this.axiosFuncs.getAll("argument/" + argumentid + "/source");
  }
  async getSingle(sourceid: number): Promise<SourceTbl> {
    return await this.axiosFuncs.getSingle(this.standardEndpoint + sourceid);
  }
  async add(newSource: AddSourceTbl): Promise<number> {
    return await this.axiosFuncs.add(
      "argument/" + newSource.argumentid + "/source",
      newSource,
    );
  }
  async update(updateSource: SourceTbl): Promise<void> {
    return await this.axiosFuncs.update(
      this.standardEndpoint + updateSource.id,
      updateSource,
    );
  }
  async delete(sourceid: number): Promise<void> {
    return await this.axiosFuncs.delete(this.standardEndpoint + sourceid);
  }
}
