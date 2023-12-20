import * as c from "./../actions/ActionTypes";

export const closeNewEditNoteForm = () => ({
  type: c.CLOSE_NEW_EDIT_NOTE_FORM,
});

export const openFormToCreateNewNote = () => ({
  type: c.OPEN_NEW_NOTE_FORM,
});

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

export const showNewJournalModal = () => ({ type: c.OPEN_NEW_JOURNAL_FORM });

export const showEditJournalModal = (journal) => {
  const { name, journalId } = journal;
  return {
    type: c.OPEN_EDIT_JOURNAL_FORM,
    name,
    journalId,
  };
};

export const hideNewEditJournalModal = () => ({
  type: c.CLOSE_NEW_EDIT_JOURNAL_FORM,
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

export const requestToPostPutNote = () => ({
  type: c.REQUEST_POST_PUT_NOTE,
});

export const postNoteSuccess = (note) => {
  const { noteId, journalId, title, content, dateCreated, lastUpdated } = note;
  return {
    type: c.POST_NOTE_SUCCESS,
    noteId,
    journalId,
    title,
    content,
    dateCreated,
    lastUpdated,
  };
};

export const putNoteSuccess = (note) => {
  const { noteId, journalId, title, content, dateCreated, lastUpdated } = note;
  return {
    type: c.PUT_NOTE_SUCCESS,
    noteId,
    journalId,
    title,
    content,
    dateCreated,
    lastUpdated,
  };
};

export const postPutNoteFailure = (error) => ({
  type: c.POST_NEW_EDIT_NOTE_FAILURE,
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

export const requestToPostPutNewJournal = () => ({
  type: c.REQUEST_POST_PUT_JOURNAL,
});

export const postPutJournalSuccess = (journal) => {
  const { journalId, name } = journal;
  return {
    type: c.POST_NEW_JOURNAL_SUCCESS,
    journalId,
    name,
  };
};

export const postPutJournalFailure = (error) => ({
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

export const openEditNoteForm = (note) => {
  const { noteId, title, content } = note;
  return {
    type: c.OPEN_EDIT_NOTE_FORM,
    noteId,
    title,
    content,
  };
};
