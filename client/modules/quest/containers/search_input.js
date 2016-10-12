import { composeAll, useDeps, compose } from 'mantra-core';
import SearchInput from '../components/search_input';

export const composer = ({ searchItems, mode }, onData) => {
  onData(null, { items: searchItems[mode] });
};

export const depsMapper = (context, actions) => ({
  context: () => context,
  onSelected: actions.search.setSearchResult,
});

export default composeAll(
  compose(composer),
  useDeps(depsMapper)
)(SearchInput);
