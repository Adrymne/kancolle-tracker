import ResourceWeightInput from '../components/ResourceWeightInput';
import { useDeps, composeWithTracker, composeAll } from 'mantra-core';

// TODO: Allow decimal input (see http://stackoverflow.com/questions/28072727/translating-between-cents-and-dollars-in-html-input-in-react/28077112#28077112)
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
