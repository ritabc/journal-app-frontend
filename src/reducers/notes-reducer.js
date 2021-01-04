import * as c from "../actions/ActionTypes";

const defaultState = { isLoading: false, notes: {}, error: null };

export default (state = defaultState, action) => {
  switch (action.type) {
    case c.REQUEST_NOTES:
      return Object.assign({}, state, {
        isLoading: true,
      });
    case c.GET_NOTES_SUCCESS:
      let notesForState = {};
      action.notes.forEach((note) => {
        notesForState[note.id] = {
          title: note.title,
          noteId: note.id,
          content: note.content,
          createdAt: note.created_at,
          updatedAt: note.updated_at,
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
    default:
      return state;
  }
};
