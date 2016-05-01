import Prerequisite from '../components/prerequisite';
import { useDeps, composeWithTracker, composeAll } from 'mantra-core';
import { getQuestColour } from '../libs/quest';

export const composer = ({ quest }, onData) => {
  onData(null, {
    ...quest,
    colour: getQuestColour(quest._id),
  });
};

export const depsMapper = (context, actions) => ({
  onClick: actions.quests.select,
  context: () => context,
});

export default composeAll(
  composeWithTracker(composer),
  useDeps(depsMapper)
)(Prerequisite);
