import IInfo from "./info";
import ISource from "./source";

export default interface IArgument {
  id: number;
  title: string;
  description: string;
  generalNotes: string;
  info: IInfo;
  debateid: number;
  sources: ISource[];
}
