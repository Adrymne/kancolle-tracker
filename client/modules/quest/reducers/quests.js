import dagre from 'dagre';
import _ from 'lodash';

function buildGraph(state, { quests }) {
  const graph = new dagre.graphlib.Graph()
      .setGraph({ ranksep: 75, nodesep: 75 })
      .setDefaultEdgeLabel(() => ({}));
  quests.forEach((quest) => {
    graph.setNode(quest._id, { ...quest, label: quest._id });
  });
  quests.forEach((quest) => {
    if (!quest.requires) {
      return;
    }
    quest.requires.forEach((parentId) => {
      graph.setEdge(parentId, quest._id);
    });
  });
  dagre.layout(graph);
  // format state
  const result = {
    nodes: [], // xy coordinates
    edges: [], // connections
    data: {}, // quest information, indexed by id
  };
  graph.nodes().forEach((id) => {
    const node = graph.node(id);
    result.nodes.push(_.pick(node, ['_id', 'x', 'y']));
    result.data[id] = _.omit(node, ['_id', 'x', 'y']);
  });
  return result;
}

function selectQuest({ selected }, { _id }) {
  return {
    selected: (selected === _id) ? null : _id,
  };
}

export default {
  quests(state = null, action) {
    switch (action.type) {
      case 'BUILD_QUEST_GRAPH':
        return { ...state, ...buildGraph(state, action) };
      case 'SELECT_QUEST':
        return { ...state, ...selectQuest(state, action) };
      default:
        return state;
    }
  },
};
