import newNoteFormVisibleOnPageReducer from "../../reducers/new-note-form-visible-on-page-reducer";
import * as c from "./../../actions/ActionTypes";

describe("newNoteFormVisibleOnPageReducer", () => {
  test("Should return default state if there is no action type passed into the reducer", () => {
    expect(newNoteFormVisibleOnPageReducer(false, { type: null })).toEqual(
      false
    );
  });

  test("Should toggle form visibility state to true", () => {
    expect(
      newNoteFormVisibleOnPageReducer(false, { type: c.TOGGLE_NEW_NOTE_FORM })
    ).toEqual(true);
  });

  test("Should toggle form visibility state to false", () => {
    expect(
      newNoteFormVisibleOnPageReducer(true, { type: c.TOGGLE_NEW_NOTE_FORM })
    ).toEqual(false);
  });
});
