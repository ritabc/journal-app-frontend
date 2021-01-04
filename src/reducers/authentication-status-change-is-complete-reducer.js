import * as c from "../actions/ActionTypes";

export default (state = true, action) => {
  switch (action.type) {
    case c.AUTHENTICATION_STATUS_CHANGE_IS_COMPLETE:
      return !state;
    default:
      return state;
  }
};
