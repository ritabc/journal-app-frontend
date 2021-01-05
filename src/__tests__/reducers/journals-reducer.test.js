import journalsReducer from "../../reducers/journals-reducer";
import * as c from "../../actions/ActionTypes";
import { v4 } from "uuid";

describe("journalsReducer", () => {
  const defaultState = {
    isLoading: false,
    journals: {},
    error: null,
  };

  let action;

  const loadingState = {
    isLoading: true,
    journals: {},
    error: null,
  };

  test("Should successfully return the default state if no action is passed into it", () => {
    expect(journalsReducer(defaultState, { type: null })).toEqual({
      isLoading: false,
      journals: {},
      error: null,
    });
  });

  test("requesting journals should successfully change isLoading from false to true", () => {
    action = {
      type: c.REQUEST_JOURNALS,
    };
    expect(journalsReducer(defaultState, action)).toEqual({
      isLoading: true,
      journals: {},
      error: null,
    });
  });

  test("Successfully getting journals should change isLoading to false and update journal", () => {
    const journals = [{ name: "Dream Diary", id: "ABC" }];
    action = {
      type: c.GET_JOURNALS_SUCCESS,
      journals,
    };
    expect(journalsReducer(loadingState, action)).toEqual({
      isLoading: false,
      journals: { ABC: { name: "Dream Diary", journalId: "ABC" } },
      error: null,
    });
  });

  test("failing to get journals should change isLoading to false and add an error message", () => {
    const error = "An error";
    action = {
      type: c.GET_JOURNALS_FAILURE,
      error,
    };
    expect(journalsReducer(loadingState, action)).toEqual({
      isLoading: false,
      journals: {},
      error: "An error",
    });
  });

  test("requesting journal POST should successfully change isLoading from false to true", () => {
    action = {
      type: c.REQUEST_POST_NEW_JOURNAL,
    };
    expect(journalsReducer(defaultState, action)).toEqual({
      isLoading: true,
      journals: {},
      error: null,
    });
  });

  test("Successfully POSTing new journal should change isLoading to false and update journals", () => {
    const name = "Movies";
    const journalId = v4();
    action = {
      type: c.POST_NEW_JOURNAL_SUCCESS,
      name,
      journalId,
    };
    expect(journalsReducer(loadingState, action)).toEqual({
      isLoading: false,
      journals: {
        [journalId]: {
          name: "Movies",
          journalId,
        },
      },
      error: null,
    });
  });
  test("failing to POST new journal should change isLoading to false and add an error message", () => {
    const error = "An error";
    action = {
      type: c.POST_NEW_JOURNAL_FAILURE,
      error,
    };
    expect(journalsReducer(loadingState, action)).toEqual({
      isLoading: false,
      journals: {},
      error: "An error",
    });
  });
});
