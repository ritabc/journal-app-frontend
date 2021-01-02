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
