import * as c from "../actions/ActionTypes";

export default (state = {}, action) => {
  const { journalId, name, notes } = action;
  switch (action.type) {
    case c.CHANGE_JOURNAL:
      return { journalId, name, notes };
    case c.NULLIFY_CURRENT_JOURNAL:
      return null;
    default:
      return state;
  }
};
