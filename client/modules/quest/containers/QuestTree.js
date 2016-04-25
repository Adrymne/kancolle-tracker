import QuestTree from '../components/QuestTree';
import { composeAll, composeWithTracker, useDeps } from 'mantra-core';

export const composer = ({ context }, onData) => {
  const { Store } = context();
  const update = () => {
    const store = Store.getState();
    onData(null, {
      size: store.svgSize,
      quests: store.quests.nodes,
    });
  };
  Store.subscribe(update);
};

export default composeAll(
  composeWithTracker(composer),
  useDeps()
)(QuestTree);
