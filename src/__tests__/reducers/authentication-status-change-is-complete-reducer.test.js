import authenticationStatusChangeIsCompleteReducer from "../../reducers/authentication-status-change-is-complete-reducer";
import * as c from "../../actions/ActionTypes";

describe("authenticationStatusChangeIsCompleteReducer", () => {
  test("Should return default state if there is no action type passed into the reducer", () => {
    expect(
      authenticationStatusChangeIsCompleteReducer(false, { type: null })
    ).toEqual(false);
  });

  test("Should toggle user authenticationStatusChangeIsComplete to true", () => {
    expect(
      authenticationStatusChangeIsCompleteReducer(false, {
        type: c.AUTHENTICATION_STATUS_CHANGE_IS_COMPLETE,
      })
    ).toEqual(true);
  });

  test("Should toggle user authenticationStatusChangeIsComplete to false", () => {
    expect(
      authenticationStatusChangeIsCompleteReducer(true, {
        type: c.AUTHENTICATION_STATUS_CHANGE_IS_COMPLETE,
      })
    ).toEqual(false);
  });
});
