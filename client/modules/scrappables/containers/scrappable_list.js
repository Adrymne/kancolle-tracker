import ScrappableList from '../components/scrappable_list';
import { useDeps, composeAll, compose } from 'mantra-core';

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
  onData(null, { types: TYPES });
};

export default composeAll(
  compose(composer),
  useDeps()
)(ScrappableList);
