export default {
  keybinds(state = {}, action) {
    switch (action.type) {
      case 'SET_KEYBINDS':
        return { ...state, [action.module]: action.map };
      default:
        return state;
    }
  },
};
