import { v4 } from "uuid";
import journalListReducer from "../../reducers/journal-list-reducer";
import * as c from "../../actions/ActionTypes";

describe("journalListReducer", () => {
  let action;
  const journalData = {
    name: "Funny Dog Memes",
    id: v4(),
    notes: [],
  };
  test("Should return default state if no action type is recognized", () => {
    expect(journalListReducer({}, { type: null })).toEqual({});
  });

  test("Should successfully add new journal to journals", () => {
    const { name, id, notes } = journalData;
    action = {
      type: c.ADD_JOURNAL,
      name,
      id,
      notes,
    };
    expect(journalListReducer({}, action)).toEqual({
      [id]: { id, name, notes },
    });
  });
});
