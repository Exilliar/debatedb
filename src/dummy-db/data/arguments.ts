import IArgument from "../elements/argument";
import InfoData from "./infos";
import sourceData from "./souces";

/* id: number;
  title: string;
  description: string;
  generalNotes: string;
  info: IInfo;
  debateid: number;
  sources: ISource[];
  */

const argumentData: IArgument[] = [
  {
    id: 0,
    title: "argument 1",
    description: "this is the first argument",
    generalNotes: "These are some notes written in\n- markdown",
    info: InfoData[3],
    debateid: 0,
    sources: [sourceData[0]],
  },
  {
    id: 1,
    title: "argument 2",
    description: "this is the second argument",
    generalNotes: "These are some notes written in\n- markdown",
    info: InfoData[4],
    debateid: 0,
    sources: [sourceData[1]],
  },
  {
    id: 2,
    title: "argument 3",
    description: "this is the second argument",
    generalNotes: "These are some notes written in\n- markdown",
    info: InfoData[5],
    debateid: 0,
    sources: [sourceData[2]],
  },
];

export default argumentData;
