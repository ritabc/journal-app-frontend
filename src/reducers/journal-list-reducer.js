import * as c from "../actions/ActionTypes";

export default (state = {}, action) => {
  const { id, name, notes } = action;
  switch (action.type) {
    case c.ADD_JOURNAL:
      return Object.assign({}, state, {
        [id]: {
          id,
          name,
          notes,
        },
      });
    default:
      return state;
  }
};
