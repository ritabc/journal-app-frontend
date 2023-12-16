import * as c from "../actions/ActionTypes";

export default (state = {}, action) => {
  switch (action.type) {
    case c.GOOGLE_SIGN_IN_SUCCESS:
      return {
        googleToken: action.googleToken,
      };
    case c.GOOGLE_SIGN_OUT_SUCCESS:
      return {};
    case c.GOOGLE_SIGN_IN_FAILURE:
      return {};
    default:
      return state;
  }
};
