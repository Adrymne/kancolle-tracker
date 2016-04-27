import QuestTree from '../components/quest_tree';
import { composeAll, composeWithTracker, useDeps } from 'mantra-core';

export const composer = ({ context }, onData) => {
  const { Store } = context();
  const update = () => {
    const state = Store.getState();
    onData(null, {
      quests: state.quests.nodes,
    });
  };
  Store.subscribe(update);
  update();
};

export default composeAll(
  composeWithTracker(composer),
  useDeps()
)(QuestTree);
