import * as actions from "./../../actions";
import * as c from "./../../actions/ActionTypes";

describe("help queue actions", () => {
  it("closeNewEditNoteForm should create CLOSE_NEW_EDIT_NOTE_FORM action", () => {
    expect(actions.closeNewEditNoteForm()).toEqual({
      type: c.CLOSE_NEW_EDIT_NOTE_FORM,
    });
  });
});
