import { combineReducers } from "redux";
import newNoteFormVisibleOnPageReducer from "./new-note-form-visible-on-page-reducer";
import currentlySelectedJournalReducer from "./currently-selected-journal-reducer";
import newJournalModalVisibleReducer from "./new-journal-modal-visible-reducer";
import googleSignInReducer from "./google-sign-in-reducer";
import authenticationStatusChangeIsCompleteReducer from "./authentication-status-change-is-complete-reducer";
import currentUserReducer from "./current-user-reducer";
import journalsReducer from "./journals-reducer";
import notesReducer from "./notes-reducer";

const rootReducer = combineReducers({
  newNoteFormVisibleOnPage: newNoteFormVisibleOnPageReducer,
  notes: notesReducer,
  selectedJournal: currentlySelectedJournalReducer,
  newJournalModalVisible: newJournalModalVisibleReducer,
  googleSignInToken: googleSignInReducer,
  authenticationStatusChangeIsComplete: authenticationStatusChangeIsCompleteReducer,
  currentUser: currentUserReducer,
  journals: journalsReducer,
});

export default rootReducer;
