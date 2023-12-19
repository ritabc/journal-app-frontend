import * as c from "../actions/ActionTypes";

const defaultState = { visible: false, whichForm: "new", note: {} };

export default (state = defaultState, action) => {
  switch (action.type) {
    case c.OPEN_NEW_NOTE_FORM:
      return Object.assign({}, state, {
        visible: true,
        whichForm: "new",
        note: {},
      });
    case c.OPEN_EDIT_NOTE_FORM:
      return Object.assign({}, state, {
        visible: true,
        whichForm: "edit",
        note: {
          noteId: action.noteId,
          title: action.title,
          content: action.content,
        },
      });
    case c.CLOSE_NEW_EDIT_NOTE_FORM:
      return Object.assign({}, state, {
        visible: false,
        note: {},
      });
    default:
      return state;
  }
};
