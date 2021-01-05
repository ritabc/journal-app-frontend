import * as c from "../actions/ActionTypes";

const defaultState = { isLoading: false, notes: {}, error: null };

export default (state = defaultState, action) => {
  switch (action.type) {
    case c.REQUEST_NOTES:
      return Object.assign({}, state, { isLoading: true });
    case c.GET_NOTES_SUCCESS:
      let notesForState = {};
      action.notes.forEach((note) => {
        notesForState[note.id] = {
          title: note.title,
          noteId: note.id,
          content: note.content,
          dateCreated: note.created_at,
          lastUpdated: note.updated_at,
          journalId: note.journal_id,
        };
      });
      return Object.assign({}, state, {
        isLoading: false,
        notes: notesForState,
      });
    case c.GET_NOTES_FAILURE:
      return Object.assign({}, state, {
        isLoading: false,
        error: action.error,
      });
    case c.REQUEST_POST_NEW_NOTE:
      return Object.assign({}, state, { isLoading: true });
    case c.POST_NEW_NOTE_SUCCESS:
      let newNotesList = { ...state.notes };
      const {
        title,
        content,
        noteId,
        journalId,
        dateCreated,
        lastUpdated,
      } = action;
      newNotesList[noteId] = {
        title,
        content,
        journalId,
        noteId,
        dateCreated,
        lastUpdated,
      };
      return Object.assign({}, state, {
        isLoading: false,
        notes: newNotesList,
      });
    case c.POST_NEW_NOTE_FAILURE:
      return Object.assign({}, state, {
        isLoading: false,
        error: action.error,
      });
    // case c.CLEAR_NOTES:
    //   return Object.assign({}, state, {
    //     notes: {},
    //   });
    default:
      return state;
  }
};
