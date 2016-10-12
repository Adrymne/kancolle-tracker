import d3 from 'd3';

function getCentreTransform({ Store }, questId) {
  const svg = d3.select('svg').node().getBoundingClientRect();
  const node = Store.getState().quests.nodes.find((quest) =>
    quest._id === questId
  );
  return {
    x: svg.width / 2 - node.x,
    y: svg.height / 2 - node.y,
  };
}

export default {
  setSearchResult({ Store }, _id) {
    Store.dispatch({
      type: 'SELECT_QUEST',
      _id,
    });
    Store.dispatch({
      type: 'CENTRE_ON_QUEST',
      location: getCentreTransform({ Store }, _id),
    });
  },
};
