import { combineReducers } from "redux";
import currentlySelectedJournalReducer from "./currently-selected-journal-reducer";
import googleSignInReducer from "./google-sign-in-reducer";
import authenticationStatusChangeIsCompleteReducer from "./authentication-status-change-is-complete-reducer";
import currentUserReducer from "./current-user-reducer";
import journalsReducer from "./journals-reducer";
import notesReducer from "./notes-reducer";
import newOrEditNoteFormReducer from "./new-or-edit-note-form-reducer";
import newOrEditJournalFormReducer from "./new-or-edit-journal-form-reducer";

const rootReducer = combineReducers({
  newOrEditNoteForm: newOrEditNoteFormReducer,
  newOrEditJournalForm: newOrEditJournalFormReducer,
  notes: notesReducer,
  selectedJournal: currentlySelectedJournalReducer,
  googleSignInToken: googleSignInReducer,
  authenticationStatusChangeIsComplete:
    authenticationStatusChangeIsCompleteReducer,
  currentUser: currentUserReducer,
  journals: journalsReducer,
});

export default rootReducer;
