import * as actions from "./../../actions";
import * as c from "./../../actions/ActionTypes";

describe("help queue actions", () => {
  it("closeNewEditNoteForm should create TOGGLE_FORM action", () => {
    expect(actions.closeNewEditNoteForm()).toEqual({
      type: c.TOGGLE_NEW_NOTE_FORM,
    });
  });
});
