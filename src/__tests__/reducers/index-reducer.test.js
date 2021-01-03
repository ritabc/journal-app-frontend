import rootReducer from "../../reducers/index";
import { createStore } from "redux";
import noteListReducer from "../../reducers/note-list-reducer";
import newNoteFormVisibleOnPageReducer from "../../reducers/new-note-form-visible-on-page-reducer";
import { v4 } from "uuid";
import * as c from "./../../actions/ActionTypes";
import journalListReducer from "../../reducers/journal-list-reducer";
import currentlySelectedJournalReducer from "../../reducers/currently-selected-journal-reducer";
import newJournalModalVisibleReducer from "../../reducers/new-journal-modal-visible-reducer";

let store = createStore(rootReducer);

describe("rootReducer", () => {
  test("Should return default state if no action type is recognized", () => {
    expect(rootReducer({}, { type: null })).toEqual({
      notes: {},
      newNoteFormVisibleOnPage: false,
      journals: {},
      selectedJournal: {},
      newJournalModalVisible: false,
    });
  });

  test("Check that initial state of noteListReducer matches root reducer", () => {
    expect(store.getState().notes).toEqual(
      noteListReducer(undefined, { type: null })
    );
  });

  test("Check that initial state of newNoteFormVisibileOnPageReducer matches root reducer", () => {
    expect(store.getState().newNoteFormVisibleOnPage).toEqual(
      newNoteFormVisibleOnPageReducer(undefined, { type: null })
    );
  });

  test("Check that initial state of journals matches root reducer", () => {
    expect(store.getState().journals).toEqual(
      journalListReducer(undefined, { type: null })
    );
  });

  test("Check that initial state of selectedJournal matches root reducer", () => {
    expect(store.getState().selectedJournal).toEqual(
      currentlySelectedJournalReducer(undefined, { type: null })
    );
  });

  test("Check that initial state of newJournalModalVisible matches root reducer", () => {
    expect(store.getState().newJournalModalVisible).toEqual(
      newJournalModalVisibleReducer(undefined, { type: null })
    );
  });

  test("Check that ADD_NOTE action works for noteListReducer and root reducer", () => {
    const action = {
      type: c.ADD_NOTE,
      title: "Bathe Cleo",
      content: "We should bathe the dog tomorrow",
      id: v4(),
    };
    store.dispatch(action);
    expect(store.getState().notes).toEqual(noteListReducer(undefined, action));
  });

  test("Check that TOGGLE_FORM action works for newNoteFormVisibleOnPageReducer and root reducer", () => {
    const action = {
      type: c.TOGGLE_NEW_NOTE_FORM,
    };
    store.dispatch(action);
    expect(store.getState().newNoteFormVisibleOnPage).toEqual(
      newNoteFormVisibleOnPageReducer(undefined, action)
    );
  });

  test("Check that ADD_JOURNAL action works for journalListReducer and root reducer", () => {
    const action = {
      type: c.ADD_JOURNAL,
      name: "Funny Dog Memes",
      id: v4(),
      notes: [],
    };
    store.dispatch(action);
    expect(store.getState().journals).toEqual(
      journalListReducer(undefined, action)
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

  test("Check that TOGGLE_NEW_JOURNAL_MODAL action works for journalListReducer and root reducer", () => {
    const action = {
      type: c.TOGGLE_NEW_JOURNAL_MODAL,
    };
    store.dispatch(action);
    expect(store.getState().newJournalModalVisible).toEqual(
      newJournalModalVisibleReducer(undefined, action)
    );
  });
});
