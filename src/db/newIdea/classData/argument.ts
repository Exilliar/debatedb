import TableBase from "./TableBase";
import ArgumentTbl from "../elements/argumentTbl";

export default class ArgumentData extends TableBase<ArgumentTbl> {
  constructor(refresh: () => Promise<any>) {
    super(
      [
        {
          id: 0,
          title: "argument 1",
          description: "this is the first argument",
          generalNotes: "These are some notes written in\n- markdown",
          infoid: 3,
          debateid: 0,
        },
        {
          id: 1,
          title: "argument 2",
          description: "this is the second argument",
          generalNotes: "These are some notes written in\n- markdown",
          infoid: 4,
          debateid: 0,
        },
        {
          id: 2,
          title: "argument 3",
          description: "this is the second argument",
          generalNotes: "These are some notes written in\n- markdown",
          infoid: 5,
          debateid: 0,
        },
      ],
      refresh
    );
  }
}
