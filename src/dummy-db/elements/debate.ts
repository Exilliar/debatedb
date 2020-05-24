import IInfo from "./info";

export default interface IDebate {
  id: number;
  title: string;
  description: string;
  generalNotes: string;
  // infoid: number;
  info: IInfo;
}
