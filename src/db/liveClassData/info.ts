import InfoTbl, { AddInfoTbl } from "../elements/infoTbl";
import AxiosFuncs from "./AxiosFuncs";

export default class InfoDatadb {
  private standardEndpoint = "info/";
  private axiosFuncs = new AxiosFuncs<InfoTbl, AddInfoTbl>();

  async getAll(): Promise<InfoTbl[]> {
    return await this.axiosFuncs.getAll(this.standardEndpoint);
  }
  async getSingle(infoid: number): Promise<InfoTbl> {
    return await this.axiosFuncs.getSingle(this.standardEndpoint + infoid);
  }
  async add(newInfo: AddInfoTbl): Promise<number> {
    return await this.axiosFuncs.add(this.standardEndpoint, newInfo);
  }
  async update(updateInfo: InfoTbl): Promise<void> {
    return await this.axiosFuncs.update(
      this.standardEndpoint + updateInfo.id,
      updateInfo,
    );
  }
  async delete(infoid: number): Promise<void> {
    return await this.axiosFuncs.delete(this.standardEndpoint + infoid);
  }
}
