import * as c from "./../actions/ActionTypes";

export default (state = {}, action) => {
  const { title, content, journalId, id, dateCreated, lastUpdated } = action;
  switch (action.type) {
    case c.ADD_NOTE:
      return Object.assign({}, state, {
        [id]: {
          title,
          content,
          journalId,
          id,
          dateCreated,
          lastUpdated,
        },
      });
    default:
      return state;
  }
};
