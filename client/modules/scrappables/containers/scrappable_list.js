import ScrappableList from '../components/scrappable_list';
import { useDeps, composeAll } from 'mantra-core';
import { composeWithRedux } from '/lib/util';

const TYPES = [
  { type: 'DD', text: 'DD' },
  { type: 'CL', text: 'CL' },
  { type: 'CA', text: 'CA' },
  { type: 'BB', text: 'BB' },
  { type: 'CV', text: 'CV' },
  { type: 'SS', text: 'SS' },
  { type: null, text: 'Other' },
];

export const composer = ({ context }, onData) => {
  const { Store } = context();
  onData(null, {
    types: TYPES,
    mode: Store.getState().scrappables.mode,
  });
};

export const depsMapper = (context, actions) => ({
  onTabSelect: actions.scrappables.setMode,
  context: () => context,
});

export default composeAll(
  composeWithRedux(composer),
  useDeps(depsMapper)
)(ScrappableList);
