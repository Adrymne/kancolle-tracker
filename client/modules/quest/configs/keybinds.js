export default function ({ Store }) {
  Store.dispatch({
    type: 'SET_KEYBINDS',
    module: 'quest',
    map: {
      toggleCompletion: 'space',
      searchByDescription: 'mod+f',
      searchByRewards: 'mod+shift+f',
    },
  });
}
