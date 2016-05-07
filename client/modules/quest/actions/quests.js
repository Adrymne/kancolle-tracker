import d3 from 'd3';
import { save } from '../libs/local_data';

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
  loadQuestNodeDimensions({ Store }, { padding }) {
    const result = {};
    d3.selectAll('.quest-node').each(function getNodeDimensions() { // eslint-disable-line prefer-arrow-callback
      const bbox = this.getBBox();
      const id = d3.select(this).attr('data-id');
      result[id] = {
        width: bbox.width + padding.left + padding.right,
        height: bbox.height + padding.top + padding.bottom,
      };
    });
    Store.dispatch({
      type: 'SET_QUEST_NODE_DIMENSIONS',
      dimensions: result,
    });
  },
  saveLocalQuestCompletion({ Store }) {
    save(Store.getState().quests.completion);
  },
};
