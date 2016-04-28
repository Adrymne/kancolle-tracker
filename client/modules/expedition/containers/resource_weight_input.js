import ResourceWeightInput from '../components/resource_weight_input';
import { useDeps, composeAll } from 'mantra-core';
import { composeWithRedux } from '/lib/util';

// TODO: Allow decimal input (see http://stackoverflow.com/questions/28072727/translating-between-cents-and-dollars-in-html-input-in-react/28077112#28077112)
export const composer = ({ context }, onData) => {
  const { Store } = context();
  onData(null, {
    resourceWeights: Store.getState().resourceWeight,
  });
};

export const depsMapper = (context, actions) => ({
  setResourceWeight: actions.resourceWeight.set,
  context: () => context,
});

export default composeAll(
  composeWithRedux(composer),
  useDeps(depsMapper)
)(ResourceWeightInput);
