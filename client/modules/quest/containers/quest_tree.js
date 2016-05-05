import QuestTree from '../components/quest_tree';
import { composeAll, composeWithTracker, useDeps } from 'mantra-core';
import { composeWithRedux } from '/lib/util';

export const collectionComposer = ({ context, actions }, onData) => {
  const { Meteor, Collections } = context();
  const { quests: { buildTree: build } } = actions();
  if (Meteor.subscribe('quests.list').ready()) {
    const quests = Collections.Quests.find().fetch();
    build(quests);
    onData(null, {});
  }
};

export const reduxComposer = ({ context }, onData) => {
  const { Store } = context();
  const state = Store.getState();
  if (!state.quests) {
    return;
  }
  onData(null, {
    ...state.svg,
    quests: state.quests.nodes,
    edges: state.quests.edges,
    keyMap: state.keybinds.quest,
  });
};

export const depsMapper = (context, actions) => ({
  onResize: actions.svg.resize,
  onZoom: actions.svg.zoom,
  loadQuestNodeDimensions: actions.quests.loadQuestNodeDimensions,
  keyHandlers: {
    toggleCompletion: actions.quests.toggleCompletion,
  },
  actions: () => actions,
  context: () => context,
});

export default composeAll(
  composeWithRedux(reduxComposer),
  composeWithTracker(collectionComposer),
  useDeps(depsMapper)
)(QuestTree);
