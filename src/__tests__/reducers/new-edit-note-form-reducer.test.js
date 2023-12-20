import newEditNoteFormReducer from "../../reducers/new-or-edit-note-form-reducer";
import * as c from "../../actions/ActionTypes";

describe("newEditNoteFormReducer", () => {
  const noteToEdit = {
    noteId: "1",
    title: "It's sunny today",
    content: "I think it'll be nice all day",
  };

  const defaultState = { visible: false, whichForm: "new", note: {} };
  const newFormOpenState = { visible: true, whichForm: "new", note: {} };
  const editFormOpenState = {
    visible: true,
    whichForm: "edit",
    note: noteToEdit,
  };

  test("Should return default state if there is no action type passed into the reducer", () => {
    expect(newEditNoteFormReducer(defaultState, { type: null })).toEqual({
      visible: false,
      whichForm: "new",
      note: {},
    });
  });

  test("Should show new note form", () => {
    expect(
      newEditNoteFormReducer(defaultState, { type: c.OPEN_NEW_NOTE_FORM })
    ).toEqual({ visible: true, whichForm: "new", note: {} });
  });

  test("Should close new note form", () => {
    expect(
      newEditNoteFormReducer(newFormOpenState, {
        type: c.CLOSE_NEW_EDIT_NOTE_FORM,
      })
    ).toEqual({ visible: false, whichForm: "new", note: {} });
  });

  test("Should show edit note form", () => {
    expect(
      newEditNoteFormReducer(defaultState, {
        type: c.OPEN_EDIT_NOTE_FORM,
        noteId: noteToEdit.noteId,
        title: noteToEdit.title,
        content: noteToEdit.content,
      })
    ).toEqual({ visible: true, whichForm: "edit", note: noteToEdit });
  });

  test("Should close edit note form", () => {
    expect(
      newEditNoteFormReducer(editFormOpenState, {
        type: c.CLOSE_NEW_EDIT_NOTE_FORM,
      })
    ).toEqual({ visible: false, whichForm: "edit", note: {} });
  });
});
