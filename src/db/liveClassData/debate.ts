import Base from "./base.model";
import DebateTbl from "../elements/debateTbl";
import TableBase from "./TableBase";

interface AddDebateTbl {
  title: string;
  description: string;
  generalNotes: string;
  infoid: number;
  accountid: number;
}

export default class DebateDatadb implements Base<DebateTbl> {
  standardEndpoint = "account/debate/";
  tableBase = new TableBase<DebateTbl, AddDebateTbl>();

  async getAll(accountid: number): Promise<DebateTbl[]> {
    return await this.tableBase.getAll("account/" + accountid + "/debate");
  }
  async getSingle(debateid: number): Promise<DebateTbl> {
    return await this.tableBase.getSingle(this.standardEndpoint + debateid);
  }
  async update(updateDebate: DebateTbl): Promise<void> {
    return await this.tableBase.update(
      this.standardEndpoint + updateDebate.id,
      updateDebate,
    );
  }
  async add(newDebate: AddDebateTbl): Promise<void> {
    return await this.tableBase.add(this.standardEndpoint, newDebate);
  }
  async delete(debateid: number): Promise<void> {
    return await this.tableBase.delete(this.standardEndpoint + debateid);
  }
}
