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
  const { name, id, notes } = journal;
  return {
    type: c.CHANGE_JOURNAL,
    name,
    id,
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
