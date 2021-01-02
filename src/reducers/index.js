import { combineReducers } from "redux";
import newNoteFormVisibleOnPageReducer from "./new-note-form-visible-on-page-reducer";
import noteListReducer from "./note-list-reducer";

const rootReducer = combineReducers({
  newNoteFormVisibleOnPage: newNoteFormVisibleOnPageReducer,
  notes: noteListReducer,
});

export default rootReducer;
