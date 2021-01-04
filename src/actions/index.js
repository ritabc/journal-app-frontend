import * as c from "./../actions/ActionTypes";

export const addNote = (note) => {
  const { title, content, journalId, id, dateCreated, lastUpdated } = note;
  return {
    type: c.ADD_NOTE,
    title,
    content,
    journalId,
    id,
    dateCreated,
    lastUpdated,
  };
};

export const toggleNewNoteForm = () => ({
  type: c.TOGGLE_NEW_NOTE_FORM,
});

export const addJournal = (journal) => {
  const { name, id, notes } = journal;
  return {
    type: c.ADD_JOURNAL,
    name,
    id,
    notes,
  };
};

export const changeJournal = (journal) => {
  console.log(journal);
  const { name, journalId, notes } = journal;
  return {
    type: c.CHANGE_JOURNAL,
    name,
    journalId,
    notes,
  };
};

export const togggleNewJournalModal = () => ({
  type: c.TOGGLE_NEW_JOURNAL_MODAL,
});

export const googleSignInSuccess = (googleToken) => ({
  type: c.GOOGLE_SIGN_IN_SUCCESS,
  googleToken,
});

export const googleSignOutSuccess = () => ({
  type: c.GOOGLE_SIGN_OUT_SUCCESS,
});

export const toggleAuthenticationStatusChangeIsComplete = () => ({
  type: c.AUTHENTICATION_STATUS_CHANGE_IS_COMPLETE,
});

export const addCurrentUser = (currentUser) => {
  const { givenName, familyName, userId, email, jwt } = currentUser;
  return {
    type: c.ADD_CURRENT_USER,
    givenName,
    familyName,
    userId,
    email,
    jwt,
  };
};

export const removeCurrentUser = () => ({
  type: c.REMOVE_CURRENT_USER,
});

export const requestJournals = () => ({
  type: c.REQUEST_JOURNALS,
});

export const getJournalsSuccess = (journals) => ({
  type: c.GET_JOURNALS_SUCCESS,
  journals,
});

export const getJournalsFailure = (error) => ({
  type: c.GET_JOURNALS_FAILURE,
  error,
});

export const requestNotes = () => ({
  type: c.REQUEST_NOTES,
});

export const getNotesSuccess = (journals) => ({
  type: c.GET_NOTES_SUCCESS,
  journals,
});

export const getNotesFailure = (error) => ({
  type: c.GET_NOTES_FAILURE,
  error,
});
