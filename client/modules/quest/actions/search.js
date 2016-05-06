export default {
  startDescriptionSearch({ Store }) {
    Store.dispatch({
      type: 'SET_SEARCH_MODE',
      mode: 'description',
    });
    return false; // prevent hotkey event from propogating
  },
  cancelSearch({ Store }, { key }) {
    if (key.toLowerCase() !== 'escape') {
      return;
    }
    const state = Store.getState();
    if (!state.search.mode) {
      return;
    }
    Store.dispatch({
      type: 'SET_SEARCH_MODE',
      mode: null,
    });
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
