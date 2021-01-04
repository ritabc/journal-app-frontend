import { v4 } from "uuid";
import * as c from "../../actions/ActionTypes";
import currentlySelectedJournalReducer from "../../reducers/currently-selected-journal-reducer";

describe("currentlySelectedJournalReducer", () => {
  let action;
  const journalData = {
    name: "Funny Dog Memes",
    journalId: v4(),
    notes: [],
  };

  test("Should return default state if no action type is recognized", () => {
    expect(currentlySelectedJournalReducer({}, { type: null })).toEqual({});
  });

  test("Should successfully change currentlySelectedJournal", () => {
    const { name, journalId, notes } = journalData;
    action = {
      type: c.CHANGE_JOURNAL,
      name,
      journalId,
      notes,
    };
    expect(currentlySelectedJournalReducer({}, action)).toEqual({
      journalId,
      name,
      notes,
    });
  });
});
