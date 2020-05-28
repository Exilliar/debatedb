import TableBase from "./TableBase";
import DebateTbl from "../elements/debateTbl";

export default class DebateData extends TableBase<DebateTbl> {
  constructor(refresh: () => Promise<any>) {
    super(
      [
        {
          id: 0,
          title: "debate 1",
          description: "this is the first debate",
          generalNotes:
            "these are some notes about the debate written in \n- markdown",
          infoid: 0,
        },
        {
          id: 1,
          title: "debate 2",
          description: "this is the second debate",
          generalNotes:
            "these are some notes about the debate written in \n- markdown",
          infoid: 1,
        },
        {
          id: 2,
          title: "debate 3",
          description: "this is the third debate",
          generalNotes:
            "these are some notes about the debate written in \n- markdown",
          infoid: 2,
        },
      ],
      refresh
    );
  }
}
