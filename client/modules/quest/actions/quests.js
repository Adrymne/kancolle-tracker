export default {
  buildTree({ Store }, quests) {
    Store.dispatch({
      type: 'BUILD_QUEST_GRAPH',
      quests,
    });
  },
};
