import newJournalModalVisibleReducer from "../../reducers/new-journal-modal-visible-reducer";
import * as c from "../../actions/ActionTypes";

describe("newJournalModalVisible", () => {
  test("Should return default state if there is no action type passed into the reducer", () => {
    expect(newJournalModalVisibleReducer(false, { type: null })).toEqual(false);
  });

  test("Should toggle modal visibility state to true", () => {
    expect(
      newJournalModalVisibleReducer(false, { type: c.TOGGLE_NEW_JOURNAL_MODAL })
    ).toEqual(true);
  });

  test("Should toggle modal visibility state to false", () => {
    expect(
      newJournalModalVisibleReducer(true, { type: c.TOGGLE_NEW_JOURNAL_MODAL })
    ).toEqual(false);
  });
});
