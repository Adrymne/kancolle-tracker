import Quest from '../components/quest';
import { useDeps, composeAll } from 'mantra-core';
import { composeWithRedux } from '/lib/util';
import { getQuestColour } from '../libs/quest';

export const composer = ({ context, _id }, onData) => {
  const { Store } = context();
  const state = Store.getState();
  onData(null, {
    questColour: getQuestColour(_id),
    isSelected: state.quests.selected === _id,
    completion: state.quests.completion[_id] || 'inactive',
  });
};

export const depsMapper = (context, actions) => ({
  onClick: actions.quests.select,
  context: () => context,
});

export default composeAll(
  composeWithRedux(composer),
  useDeps(depsMapper)
)(Quest);
