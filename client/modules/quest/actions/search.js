export default {
  startDescriptionSearch({ Store }) {
    Store.dispatch({
      type: 'SET_SEARCH_MODE',
      mode: 'description',
    });
    return false; // prevent hotkey event from propogating
  },
  setSearchResult({ Store }, _id) {
    Store.dispatch({
      type: 'SET_SEARCH_MODE',
      mode: null,
    });
    Store.dispatch({
      type: 'SELECT_QUEST',
      _id,
    });
  },
};
