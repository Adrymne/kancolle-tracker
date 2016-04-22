import ResourceWeightInput from '../components/ResourceWeightInput';
import { useDeps, composeWithTracker, composeAll } from 'mantra-core';

export const composer = ({ context }, onData) => {
  const { Store } = context();
  const update = () => {
    onData(null, {
      resourceWeights: Store.getState().resourceWeight,
    });
  };
  Store.subscribe(update);
  update();
};

export const depsMapper = (context, actions) => ({
  setResourceWeight: actions.resourceWeight.set,
  context: () => context,
});

export default composeAll(
  composeWithTracker(composer),
  useDeps(depsMapper)
)(ResourceWeightInput);
