import newEditJournalFormReducer from "../../reducers/new-or-edit-journal-form-reducer";
import * as c from "../../actions/ActionTypes";

describe("newEditJournalFormReducer", () => {
  const newFormOpenState = { visible: true, whichForm: "new", journal: {} };
  const journalToEdit = { journalId: "1", name: "Dream Diary" };
  const editFormOpenState = {
    visible: true,
    whichForm: "edit",
    journal: journalToEdit,
  };

  const defaultState = { visible: false, whichForm: "new", journal: {} };

  test("Should return default state if there is no action type passed into the reducer", () => {
    expect(newEditJournalFormReducer(defaultState, { type: null })).toEqual({
      visible: false,
      whichForm: "new",
      journal: {},
    });
  });

  test("Should show new journal form", () => {
    expect(
      newEditJournalFormReducer(defaultState, { type: c.OPEN_NEW_JOURNAL_FORM })
    ).toEqual({ visible: true, whichForm: "new", journal: {} });
  });

  test("Should close new journal form", () => {
    expect(
      newEditJournalFormReducer(newFormOpenState, {
        type: c.CLOSE_NEW_EDIT_JOURNAL_FORM,
      })
    ).toEqual({ visible: false, whichForm: "new", journal: {} });
  });

  test("Should show edit journal form", () => {
    expect(
      newEditJournalFormReducer(defaultState, {
        type: c.OPEN_EDIT_JOURNAL_FORM,
        journalId: journalToEdit.journalId,
        name: journalToEdit.name,
      })
    ).toEqual({ visible: true, whichForm: "edit", journal: journalToEdit });
  });

  test("Should close edit journal form", () => {
    expect(
      newEditJournalFormReducer(editFormOpenState, {
        type: c.CLOSE_NEW_EDIT_JOURNAL_FORM,
      })
    ).toEqual({ visible: false, whichForm: "edit", journal: {} });
  });
});
