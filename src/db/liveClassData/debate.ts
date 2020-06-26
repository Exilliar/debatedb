import DebateTbl from "../elements/debateTbl";
import AxiosFuncs from "./AxiosFuncs";

interface AddDebateTbl {
  title: string;
  description: string;
  generalNotes: string;
  infoid: number;
  accountid: number;
}

export default class DebateDatadb {
  private standardEndpoint = "account/debate/";
  private axiosFuncs = new AxiosFuncs<DebateTbl, AddDebateTbl>();

  async getAll(accountid: number): Promise<DebateTbl[]> {
    return await this.axiosFuncs.getAll("account/" + accountid + "/debate");
  }
  async getSingle(debateid: number): Promise<DebateTbl> {
    return await this.axiosFuncs.getSingle(this.standardEndpoint + debateid);
  }
  async add(newDebate: AddDebateTbl): Promise<number> {
    return await this.axiosFuncs.add(this.standardEndpoint, newDebate);
  }
  async update(updateDebate: DebateTbl): Promise<void> {
    return await this.axiosFuncs.update(
      this.standardEndpoint + updateDebate.id,
      updateDebate
    );
  }
  async delete(debateid: number): Promise<void> {
    return await this.axiosFuncs.delete(this.standardEndpoint + debateid);
  }
}
