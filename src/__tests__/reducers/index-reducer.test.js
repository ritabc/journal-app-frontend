import rootReducer from "../../reducers/index";
import { createStore } from "redux";
import newEditNoteFormReducer from "../../reducers/new-or-edit-note-form-reducer";
import { v4 } from "uuid";
import * as c from "./../../actions/ActionTypes";
import currentlySelectedJournalReducer from "../../reducers/currently-selected-journal-reducer";
import newEditJournalFormReducer from "../../reducers/new-or-edit-journal-form-reducer";

let store = createStore(rootReducer);

describe("rootReducer", () => {
  test("Should return default state if no action type is recognized", () => {
    expect(rootReducer({}, { type: null })).toEqual({
      newOrEditNoteForm: { visible: false, whichForm: "new", note: {} },
      newOrEditJournalForm: { visible: false, whichForm: "new", journal: {} },
      notes: { error: null, isLoading: false, notes: {} },
      journals: { error: null, isLoading: false, journals: {} },
      selectedJournal: {},
      googleSignInToken: {},
      currentUser: {},
      authenticationStatusChangeIsComplete: true,
    });
  });

  test("Check that initial state of newEditNoteForm matches root reducer", () => {
    expect(store.getState().newOrEditNoteForm).toEqual(
      newEditNoteFormReducer(undefined, { type: null })
    );
  });

  test("Check that initial state of selectedJournal matches root reducer", () => {
    expect(store.getState().selectedJournal).toEqual(
      currentlySelectedJournalReducer(undefined, { type: null })
    );
  });

  test("Check that initial state of newOrEditJournalForm matches root reducer", () => {
    expect(store.getState().newOrEditJournalForm).toEqual(
      newEditJournalFormReducer(undefined, { type: null })
    );
  });

  test("Check that OPEN_NEW_NOTE_FORM action works for newEditNoteFormReducer and root reducer", () => {
    const action = {
      type: c.OPEN_NEW_NOTE_FORM,
    };
    store.dispatch(action);
    expect(store.getState().newOrEditNoteForm).toEqual(
      newEditNoteFormReducer(undefined, action)
    );
  });

  test("Check that CHANGE_JOURNAL action works for journalListReducer and root reducer", () => {
    const action = {
      type: c.CHANGE_JOURNAL,
      name: "Funny Dog Memes",
      id: v4(),
      notes: [],
    };
    store.dispatch(action);
    expect(store.getState().selectedJournal).toEqual(
      currentlySelectedJournalReducer(undefined, action)
    );
  });

  test("Check that OPEN_NEW_JOURNAL_FORM action works for journalListReducer and root reducer", () => {
    const action = {
      type: c.OPEN_NEW_JOURNAL_FORM,
    };
    store.dispatch(action);
    expect(store.getState().newOrEditJournalForm).toEqual(
      newEditJournalFormReducer(undefined, action)
    );
  });
});
