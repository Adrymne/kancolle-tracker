import { composeAll, useDeps } from 'mantra-core';
import _ from 'lodash';
import { composeWithRedux } from '/lib/util';
import SearchInput from '../components/search_input';

export const composer = ({ context, searchItems, mode }, onData) => {
  const { Store } = context();
  const { quests: { completion } } = Store.getState();
  console.log(completion);
  onData(null, {
    items: _.map(searchItems[mode] || [], (item) => ({ ...item, status: completion[item.value] })),
  });
};

export const depsMapper = (context, actions) => ({
  context: () => context,
  onSelected: actions.search.setSearchResult,
});

export default composeAll(
  composeWithRedux(composer),
  useDeps(depsMapper)
)(SearchInput);
