import SearchBox from '../components/search_box';
import { useDeps, composeAll } from 'mantra-core';
import { composeWithRedux } from '/lib/util';
import _ from 'lodash';

const itemFactory = {
  description(quests) {
    return _.map(quests, (quest, _id) => ({
      value: _id,
      text: `[${_id}] ${quest.description}`,
    }));
  },
};

function getItems({ mode }, quests) {
  if (!mode) {
    return [];
  }
  return itemFactory[mode](quests);
}

export const composer = ({ context }, onData) => {
  const { Store } = context();
  const { quests: { data: quests }, search: opts } = Store.getState();
  onData(null, {
    items: getItems(opts, quests),
  });
};

export const depsMapper = (context, actions) => ({
  onItemSelected: actions.search.setSearchResult,
  cancelSearch: actions.search.cancelSearch,
  context: () => context,
});

export default composeAll(
  composeWithRedux(composer),
  useDeps(depsMapper)
)(SearchBox);
