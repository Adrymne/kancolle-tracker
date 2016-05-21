export default {
  setMode({ Store }, mode) {
    Store.dispatch({
      type: 'SET_SCRAPPABLES_DISPLAY_MODE',
      mode,
    });
  },
};
