import { composeAll, useDeps } from 'mantra-core';
import { composeWithRedux } from '/lib/util';
import { ScrewBase } from '../components';

export const reduxComposer = ({ context }, onData) => {
  const { Store } = context();
  const { screws: { base } } = Store.getState();
  onData(null, { base });
};

export const depsMapper = (context, actions) => ({
  context: () => context,
  onChange: actions.screwInput.setBase,
});

export default composeAll(
  composeWithRedux(reduxComposer),
  useDeps(depsMapper)
)(ScrewBase);
