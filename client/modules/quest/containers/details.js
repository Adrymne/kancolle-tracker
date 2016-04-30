import Details from '../components/details';
import { useDeps, composeWithTracker, composeAll } from 'mantra-core';
import { composeWithRedux } from '/lib/util';

export const reduxComposer = ({ context }, onData) => {
  const { Store } = context();
  const state = Store.getState();
  onData(null, { selected: state.quests.selected });
};

export const collectionComposer = ({ context, selected }, onData) => {
  if (!selected) {
    onData(null, null);
  }
  const { Collections } = context();
  const quest = Collections.Quests.findOne(selected);
  if (!quest) {
    onData(new Error(`Bad quest id  ${selected}`));
  } else {
    onData(null, quest);
  }
};

export default composeAll(
  composeWithTracker(collectionComposer),
  composeWithRedux(reduxComposer),
  useDeps()
)(Details);
