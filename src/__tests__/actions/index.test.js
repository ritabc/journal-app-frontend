import { v4 } from "uuid";
import * as actions from "./../../actions";
import * as c from "./../../actions/ActionTypes";

describe("help queue actions", () => {
  it("addNote should create ADD_NOTE action", () => {
    let id = v4();
    let now = Date.now();
    expect(
      actions.addNote({
        title: "Bathe Cleo",
        content: "We should bathe the dog tomorrow",
        journalId: 1,
        id,
        dateCreated: now,
        lastUpdated: now,
      })
    ).toEqual({
      type: c.ADD_NOTE,
      title: "Bathe Cleo",
      content: "We should bathe the dog tomorrow",
      journalId: 1,
      id,
      dateCreated: now,
      lastUpdated: now,
    });
  });

  it("toggleNewNoteForm should create TOGGLE_FORM action", () => {
    expect(actions.toggleNewNoteForm()).toEqual({
      type: c.TOGGLE_NEW_NOTE_FORM,
    });
  });
});
