import * as c from "../actions/ActionTypes";

export default (state = {}, action) => {
  const { id, name, notes } = action;
  switch (action.type) {
    case c.CHANGE_JOURNAL:
      return { id, name, notes };
    default:
      return state;
  }
};
