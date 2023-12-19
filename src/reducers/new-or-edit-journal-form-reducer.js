import * as c from "../actions/ActionTypes";

const defaultState = { visible: false, whichForm: "new", journal: {} };

export default (state = defaultState, action) => {
  switch (action.type) {
    case c.OPEN_NEW_JOURNAL_FORM:
      return Object.assign({}, state, {
        visible: true,
        whichForm: "new",
        journal: {},
      });
    case c.OPEN_EDIT_JOURNAL_FORM:
      return Object.assign({}, state, {
        visible: true,
        whichForm: "edit",
        journal: {
          journalId: action.journalId,
          name: action.name,
        },
      });
    case c.CLOSE_NEW_EDIT_JOURNAL_FORM:
      return Object.assign({}, state, {
        visible: false,
        journal: {},
      });
    default:
      return state;
  }
};
