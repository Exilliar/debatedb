import IQuote from "./quote";

export default interface ISource {
  id: number;
  link: string;
  notes: string;
  quotes: IQuote[];
}
