import { v4 } from "uuid";
import noteListReducer from "../../reducers/note-list-reducer";
import * as c from "./../../actions/ActionTypes";

describe("noteListReducer", () => {
  let action;
  const now = Date.now();
  const notesData = {
    title: "Cleo Bath",
    content: "We should bathe the dog tomorrow",
    journalId: v4(),
    id: v4(),
    dateCreated: now,
    lastUpdated: now,
  };
  test("Should return default state if no action type is recognized", () => {
    expect(noteListReducer({}, { type: null })).toEqual({});
  });

  test("Should successfully add new note data to notes", () => {
    const {
      title,
      content,
      id,
      journalId,
      dateCreated,
      lastUpdated,
    } = notesData;
    action = {
      type: c.ADD_NOTE,
      title,
      content,
      journalId,
      id,
      dateCreated,
      lastUpdated,
    };
    expect(noteListReducer({}, action)).toEqual({
      [id]: { id, title, content, journalId, dateCreated, lastUpdated },
    });
  });
});
