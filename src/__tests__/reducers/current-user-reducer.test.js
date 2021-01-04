import currentUserReducer from "../../reducers/current-user-reducer";
import * as c from "../../actions/ActionTypes";
import { v4 } from "uuid";

describe("currentUserReducer", () => {
  let action;
  const currentUserData = {
    givenName: "Jane",
    familyName: "Smith",
    userId: v4(),
    email: "jane23smith@gmail.com",
    jwt: "ABC",
  };
  const { givenName, familyName, userId, email, jwt } = currentUserData;
  test("Should return default state if there is no action type passed into the reducer", () => {
    expect(currentUserReducer({}, { type: null })).toEqual({});
  });

  test("Should successfully add currentUserData to currentUser", () => {
    action = {
      type: c.ADD_CURRENT_USER,
      givenName,
      familyName,
      userId,
      email,
      jwt,
    };
    expect(currentUserReducer({}, action)).toEqual(currentUserData);
  });

  test("Should successfully clear currentUser", () => {
    action = {
      type: c.REMOVE_CURRENT_USER,
      givenName,
      familyName,
      userId,
      email,
      jwt,
    };
    expect(currentUserReducer(currentUserData, action)).toEqual({});
  });
});
