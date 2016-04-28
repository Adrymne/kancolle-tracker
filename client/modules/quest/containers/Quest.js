import Quest from '../components/quest';
import { useDeps, composeWithTracker, composeAll } from 'mantra-core';

const QUEST_TYPES = {
  A: 'composition',
  B: 'sortie',
  C: 'pvp',
  D: 'expedition',
  E: 'resupply',
  F: 'arsenal',
  G: 'modernization',
  W: 'marriage',
};

export const composer = ({ context, _id }, onData) => {
  const { Store } = context();
  const update = () => {
    const state = Store.getState();
    onData(null, {
      questType: QUEST_TYPES[_id[0]],
      isSelected: state.quests.selected === _id,
    });
  };
  Store.subscribe(update);
  update();
};

export const depsMapper = (context, actions) => ({
  onClick: actions.quests.select,
  context: () => context,
});

export default composeAll(
  composeWithTracker(composer),
  useDeps(depsMapper)
)(Quest);
