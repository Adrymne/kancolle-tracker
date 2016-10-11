import ScrewCounter from '../components/screw_counter';
import { useDeps, composeAll } from 'mantra-core';

export default composeAll(
  useDeps()
)(ScrewCounter);
