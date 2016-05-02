export default {
  buildTree({ Store }, quests) {
    Store.dispatch({
      type: 'BUILD_QUEST_GRAPH',
      quests,
    });
  },
  select({ Store }, _id) {
    Store.dispatch({
      type: 'SELECT_QUEST',
      _id,
    });
  },
  toggleCompletion({ Store }) {
    const state = Store.getState();
    Store.dispatch({
      type: 'TOGGLE_QUEST_COMPLETION',
      _id: state.quests.selected || null,
      quests: state.quests.data,
    });
  },
};
