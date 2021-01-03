import googleSignInReducer from "../../reducers/google-sign-in-reducer";
import * as c from "../../actions/ActionTypes";

describe("googleSignInReducer", () => {
  let action;
  const mockToken = "abc";
  test("Should return default state if no action type is recognized", () => {
    expect(googleSignInReducer({}, { type: null })).toEqual({});
  });

  test("Should successfully update google sign in token", () => {
    action = {
      type: c.GOOGLE_SIGN_IN_SUCCESS,
      googleToken: mockToken,
    };
    expect(googleSignInReducer({}, action)).toEqual({
      googleToken: mockToken,
    });
  });

  test("Should clear google sign in token on log out", () => {
    action = {
      type: c.GOOGLE_SIGN_OUT_SUCCESS,
    };
    expect(googleSignInReducer({ googleToken: mockToken }, action)).toEqual({});
  });
});
