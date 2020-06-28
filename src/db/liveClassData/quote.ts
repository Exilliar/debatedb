import QuoteTbl, { AddQuoteTbl } from "../elements/quoteTbl";
import AxiosFuncs from "./AxiosFuncs";

export default class QuoteDatadb {
  private standardEndpoint = "source/quote/";
  private axiosFuncs = new AxiosFuncs<QuoteTbl, AddQuoteTbl>();

  async getAll(sourceid: number): Promise<QuoteTbl[]> {
    return await this.axiosFuncs.getAll("source/" + sourceid + "/quote");
  }
  async getSingle(quoteid: number): Promise<QuoteTbl> {
    return await this.axiosFuncs.getSingle(this.standardEndpoint + quoteid);
  }
  async add(newQuote: AddQuoteTbl): Promise<number> {
    return await this.axiosFuncs.add(
      "source/" + newQuote.sourceid + "/quote",
      newQuote,
    );
  }
  async update(updateQuote: QuoteTbl): Promise<void> {
    return await this.axiosFuncs.update(
      this.standardEndpoint + updateQuote.id,
      updateQuote,
    );
  }
  async delete(quoteid: number): Promise<void> {
    return await this.axiosFuncs.delete(this.standardEndpoint + quoteid);
  }
}
