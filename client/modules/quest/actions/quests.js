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
};
