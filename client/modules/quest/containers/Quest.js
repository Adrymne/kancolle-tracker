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
  onData(null, {
    questType: QUEST_TYPES[_id[0]],
  });
};

export default composeAll(
  composeWithTracker(composer),
  useDeps()
)(Quest);
