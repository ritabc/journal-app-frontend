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

    case c.REQUEST_DELETE_JOURNAL:
      return Object.assign({}, state, { isLoading: true });
    case c.DELETE_JOURNAL_FAILURE:
      return Object.assign({}, state, {
        isLoading: false,
        error: action.error,
      });
    case c.DELETE_JOURNAL_SUCCESS:
      // copy the current state's journals
      // all except the one to delete
      // create an object with jIDs as keys, journal
      let journalsCopy = {};
      Object.keys(state.journals).forEach((journalId) => {
        if (action.deletedJournalId === journalId) return;
        const journalFromState = state.journals[journalId];
        const { name } = journalFromState;
        journalsCopy[journalId] = { name, journalId };
      });
      return Object.assign({}, state, {
        isLoading: false,
        journals: journalsCopy,
      });
    default:
      return state;
  }
};
