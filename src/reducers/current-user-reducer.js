import * as c from "../actions/ActionTypes";

export default (state = {}, action) => {
  const { givenName, familyName, userId, email, jwt } = action;

  switch (action.type) {
    case c.ADD_CURRENT_USER:
      return { givenName, familyName, userId, email, jwt };
    case c.REMOVE_CURRENT_USER:
      return {};
    default:
      return state;
  }
};
