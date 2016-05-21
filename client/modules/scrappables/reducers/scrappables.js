function defaultState() {
  return {
    mode: 'scrappables',
  };
}

export default {
  scrappables(state = defaultState(), action) {
    switch (action.type) {
      case 'SET_SCRAPPABLES_DISPLAY_MODE':
        return { ...state, mode: action.mode };
      default:
        return state;
    }
  },
};
