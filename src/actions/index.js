import * as c from "./../actions/ActionTypes";

export const toggleNewNoteForm = () => ({
  type: c.TOGGLE_NEW_NOTE_FORM,
});

// export const addJournal = (journal) => {
//   const { name, id, notes } = journal;
//   return {
//     type: c.ADD_JOURNAL,
//     name,
//     id,
//     notes,
//   };
// };

export const changeJournal = (journal) => {
  const { name, journalId } = journal;
  return {
    type: c.CHANGE_JOURNAL,
    name,
    journalId,
  };
};

export const nullifyJournal = () => {
  return {
    type: c.NULLIFY_CURRENT_JOURNAL,
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

export const googleSignInFailure = () => ({
  type: c.GOOGLE_SIGN_IN_FAILURE,
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

export const getNotesSuccess = (notes) => ({
  type: c.GET_NOTES_SUCCESS,
  notes,
});

export const getNotesFailure = (error) => ({
  type: c.GET_NOTES_FAILURE,
  error,
});

export const requestPostNewNote = () => ({
  type: c.REQUEST_POST_NEW_NOTE,
});

export const postNewNoteSuccess = (note) => {
  const { noteId, journalId, title, content, dateCreated, lastUpdated } = note;
  return {
    type: c.POST_NEW_NOTE_SUCCESS,
    noteId,
    journalId,
    title,
    content,
    dateCreated,
    lastUpdated,
  };
};

export const postNewNoteFailure = (error) => ({
  type: c.POST_NEW_NOTE_FAILURE,
  error,
});

export const requestDeleteNote = () => {
  return {
    type: c.REQUEST_DELETE_NOTE,
  };
};

export const deleteNoteFailure = (error) => ({
  type: c.DELETE_NOTE_FAILURE,
  error,
});

export const deleteNoteSuccess = (noteId) => ({
  type: c.DELETE_NOTE_SUCCESS,
  deletedNoteId: noteId,
});

export const requestPostNewJournal = () => ({
  type: c.REQUEST_POST_NEW_JOURNAL,
});

export const postNewJournalSuccess = (journal) => {
  const { journalId, name } = journal;
  return {
    type: c.POST_NEW_JOURNAL_SUCCESS,
    journalId,
    name,
  };
};

export const postNewJournalFailure = (error) => ({
  type: c.POST_NEW_JOURNAL_FAILURE,
  error,
});

export const requestDeleteJournal = () => ({
  type: c.REQUEST_DELETE_JOURNAL,
});

export const deleteJournalFailure = (error) => ({
  type: c.DELETE_JOURNAL_FAILURE,
  error,
});

export const deleteJournalSuccess = (journalId) => ({
  type: c.DELETE_JOURNAL_SUCCESS,
  deletedJournalId: journalId,
});

export const clearJournals = () => ({
  type: c.CLEAR_JOURNALS,
});

export const clearNotes = () => ({
  type: c.CLEAR_NOTES,
});
