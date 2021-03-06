import * as c from "../actions/ActionTypes";

const defaultState = { isLoading: false, journals: {}, error: null };

export default (state = defaultState, action) => {
  switch (action.type) {
    case c.REQUEST_JOURNALS:
      return Object.assign({}, state, {
        isLoading: true,
      });
    case c.GET_JOURNALS_SUCCESS:
      let journalsForState = {};
      action.journals.forEach((journal) => {
        journalsForState[journal.id] = {
          name: journal.name,
          journalId: journal.id,
        };
      });
      return Object.assign({}, state, {
        isLoading: false,
        journals: journalsForState,
      });
    case c.GET_JOURNALS_FAILURE:
      return Object.assign({}, state, {
        isLoading: false,
        error: action.error,
      });
    case c.REQUEST_POST_NEW_JOURNAL:
      return Object.assign({}, state, { isLoading: true });
    case c.POST_NEW_JOURNAL_SUCCESS:
      const { name, journalId } = action;
      let newJournalsList = { ...state.journals };
      newJournalsList[journalId] = { name, journalId };
      return Object.assign({}, state, {
        isLoading: false,
        journals: newJournalsList,
      });
    case c.POST_NEW_JOURNAL_FAILURE:
      return Object.assign({}, state, {
        isLoading: false,
        error: action.error,
      });
    case c.CLEAR_JOURNALS:
      let newState = { ...state.journals };
      const journals = Object.values(newState).map((journalEl) => {
        return { name: journalEl.name, id: journalEl.journalId };
      });
      journals.forEach((journal) => {
        if (
          [
            "Recipes",
            "Daily Notes",
            "Dream Diary",
            "Travel Notes",
            "Introspective Notes",
          ].includes(journal.name)
        ) {
          delete newState[journal.id];
        }
      });
      return Object.assign({}, state, {
        journals: newState,
      });
    default:
      return state;
  }
};
