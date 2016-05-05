export default {
  search(state = {}, action) {
    switch (action.type) {
      case 'SET_SEARCH_MODE':
        return { ...state, mode: action.mode };
      default:
        return state;
    }
  },
};
