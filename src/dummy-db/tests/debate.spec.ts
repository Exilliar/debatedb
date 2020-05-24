import Debate from "../interface/debate";

describe("Debate", function() {
  let debate: Debate;
  beforeEach(function() {
    debate = new Debate();
  });
  describe("select", function() {
    it("should return the correct data", function() {
      const actual = debate.select();
      const expected = [
        {
          id: 0,
          title: "debate 1",
          description: "this is the first debate",
          generalNotes:
            "these are some notes about the debate written in \n- markdown",
          info: {
            id: 0,
            description:
              "this is a description that is likely a little bit longer than the other one",
            current: "the current overall arument that is being used",
            counter: "the current best counter to the overall debate",
          },
        },
      ];

      expect(actual).toEqual(expected);
    });
  });

  describe("add", function() {});

  describe("update", function() {});
});
