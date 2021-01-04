import notesReducer from "../../reducers/notes-reducer";
import * as c from "../../actions/ActionTypes";

describe("notesReducer", () => {
  const defaultState = {
    isLoading: false,
    notes: {},
    error: null,
  };

  let action;

  const loadingState = {
    isLoading: true,
    notes: {},
    error: null,
  };

  test("Should successfully return the default state if no action is passed into it", () => {
    expect(notesReducer(defaultState, { type: null })).toEqual({
      isLoading: false,
      notes: {},
      error: null,
    });
  });

  test("requesting notes should successfully change isLoading from false to true", () => {
    action = {
      type: c.REQUEST_NOTES,
    };
    expect(notesReducer(defaultState, action)).toEqual({
      isLoading: true,
      notes: {},
      error: null,
    });
  });

  test("Successfully getting notes should change isLoading to false and update note", () => {
    const notes = [
      {
        title: "Bathe Dog",
        id: "ABC",
        content: "We should bathe the dog tomorrow",
      },
    ];
    action = {
      type: c.GET_NOTES_SUCCESS,
      notes,
    };
    expect(notesReducer(loadingState, action)).toEqual({
      isLoading: false,
      notes: {
        ABC: {
          title: "Bathe Dog",
          noteId: "ABC",
          content: "We should bathe the dog tomorrow",
        },
      },
      error: null,
    });
  });

  test("failing to get notes should change isLoading to false and add an error message", () => {
    const error = "An error";
    action = {
      type: c.GET_NOTES_FAILURE,
      error,
    };
    expect(notesReducer(loadingState, action)).toEqual({
      isLoading: false,
      notes: {},
      error: "An error",
    });
  });
});
