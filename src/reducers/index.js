import { combineReducers } from "redux";
import journalListReducer from "./journal-list-reducer";
import newNoteFormVisibleOnPageReducer from "./new-note-form-visible-on-page-reducer";
import noteListReducer from "./note-list-reducer";
import currentlySelectedJournalReducer from "./currently-selected-journal-reducer";
import newJournalModalVisibleReducer from "./new-journal-modal-visible-reducer";
import googleSignInReducer from "./google-sign-in-reducer";

const rootReducer = combineReducers({
  newNoteFormVisibleOnPage: newNoteFormVisibleOnPageReducer,
  notes: noteListReducer,
  journals: journalListReducer,
  selectedJournal: currentlySelectedJournalReducer,
  newJournalModalVisible: newJournalModalVisibleReducer,
  googleSignInToken: googleSignInReducer,
});

export default rootReducer;
