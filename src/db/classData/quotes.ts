import TableBase from "./TableBase";
import QuotesTbl from "../elements/quotesTbl";
import QuotesData from "../data/quotes";

export default class QuotesDatadb extends TableBase<QuotesTbl> {
  constructor(refresh: () => Promise<any>) {
    super(QuotesData, refresh);
  }
}
