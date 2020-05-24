/* id: number;
  link: string;
  notes: string;
  quotes: IQuote[];
*/

import ISource from "../elements/source";
import quoteData from "./quotes";

const sourceData: ISource[] = [
  {
    id: 0,
    link: "link",
    notes: "some notes written in markdown",
    quotes: [quoteData[0], quoteData[1], quoteData[2]],
  },
  {
    id: 1,
    link: "link",
    notes: "some notes written in markdown",
    quotes: [quoteData[3], quoteData[4], quoteData[5]],
  },
  {
    id: 2,
    link: "link",
    notes: "some notes written in markdown",
    quotes: [quoteData[6], quoteData[7], quoteData[8]],
  },
];

export default sourceData;
