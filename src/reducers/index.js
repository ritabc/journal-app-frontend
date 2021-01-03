import { combineReducers } from "redux";
import journalListReducer from "./journal-list-reducer";
import newNoteFormVisibleOnPageReducer from "./new-note-form-visible-on-page-reducer";
import noteListReducer from "./note-list-reducer";
import currentlySelectedJournalReducer from "./currently-selected-journal-reducer";

const rootReducer = combineReducers({
  newNoteFormVisibleOnPage: newNoteFormVisibleOnPageReducer,
  notes: noteListReducer,
  journals: journalListReducer,
  selectedJournal: currentlySelectedJournalReducer,
});

export default rootReducer;
