import notesReducer from "../../reducers/notes-reducer";
import * as c from "../../actions/ActionTypes";
import { v4 } from "uuid";

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

  const now = Date.now();

  const notesData = {
    title: "Cleo Bath",
    content: "We should bathe the dog tomorrow",
    journalId: v4(),
    id: v4(),
    dateCreated: now,
    lastUpdated: now,
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

  test("requesting note POST should successfully change isLoading from false to true", () => {
    action = {
      type: c.REQUEST_POST_PUT_NOTE,
    };
    expect(notesReducer(defaultState, action)).toEqual({
      isLoading: true,
      notes: {},
      error: null,
    });
  });

  test("Successfully POSTing new note should change isLoading to false and update notes", () => {
    const { title, content, noteId, journalId, dateCreated, lastUpdated } =
      notesData;
    action = {
      type: c.POST_NOTE_SUCCESS,
      title,
      content,
      noteId,
      journalId,
      dateCreated,
      lastUpdated,
    };
    expect(notesReducer(loadingState, action)).toEqual({
      isLoading: false,
      notes: {
        [noteId]: {
          noteId,
          title,
          content,
          journalId,
          dateCreated,
          lastUpdated,
        },
      },
      error: null,
    });
  });
  test("failing to POST new note should change isLoading to false and add an error message", () => {
    const error = "An error";
    action = {
      type: c.POST_NEW_EDIT_NOTE_FAILURE,
      error,
    };
    expect(notesReducer(loadingState, action)).toEqual({
      isLoading: false,
      notes: {},
      error: "An error",
    });
  });
});
