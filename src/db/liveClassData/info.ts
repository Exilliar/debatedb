import Base from "./base.model";
import InfoTbl from "../elements/infoTbl";
import TableBase from "./TableBase";

interface AddInfoTbl {
  description: string;
  current: string;
  counter: string;
}

export default class InfoDatadb implements Base<InfoTbl> {
  private standardEndpoint = "info/";
  private tableBase = new TableBase<InfoTbl, AddInfoTbl>();

  async getAll(): Promise<InfoTbl[]> {
    return await this.tableBase.getAll(this.standardEndpoint);
  }
  async getSingle(infoid: number): Promise<InfoTbl> {
    return await this.tableBase.getSingle(this.standardEndpoint + infoid);
  }
  async add(newInfo: AddInfoTbl): Promise<number> {
    return await this.tableBase.add(this.standardEndpoint, newInfo);
  }
  async update(updateInfo: InfoTbl): Promise<void> {
    return await this.tableBase.update(
      this.standardEndpoint + updateInfo.id,
      updateInfo
    );
  }
  async delete(infoid: number): Promise<void> {
    return await this.tableBase.delete(this.standardEndpoint + infoid);
  }
}
