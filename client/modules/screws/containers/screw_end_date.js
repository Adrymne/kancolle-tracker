import { composeAll, useDeps } from 'mantra-core';
import { composeWithRedux } from '/lib/util';
import { ScrewEndDate } from '../components';

export const reduxComposer = ({ context }, onData) => {
  const { Store } = context();
  const { screws: { endDate } } = Store.getState();
  onData(null, { endDate });
};

export const depsMapper = (context, actions) => ({
  context: () => context,
  onChange: actions.screwInput.setEndDate,
});

export default composeAll(
  composeWithRedux(reduxComposer),
  useDeps(depsMapper)
)(ScrewEndDate);
