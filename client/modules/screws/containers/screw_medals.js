import { composeAll, useDeps } from 'mantra-core';
import { composeWithRedux } from '/lib/util';
import { ScrewMedals } from '../components';

export const reduxComposer = ({ context }, onData) => {
  const { Store } = context();
  const { screws: { medals } } = Store.getState();
  onData(null, { medals });
};

export const depsMapper = (context, actions) => ({
  context: () => context,
  onChange: actions.screwInput.setMedals,
});

export default composeAll(
  composeWithRedux(reduxComposer),
  useDeps(depsMapper)
)(ScrewMedals);
