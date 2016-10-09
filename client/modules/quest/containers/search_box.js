import SearchBox from '../components/search_box';
import { useDeps, composeAll } from 'mantra-core';
import { composeWithRedux } from '/lib/util';
import _ from 'lodash';
import { toString as getRewardText } from '../libs/rewards';

const itemFactory = {
  description(context, { quests }) {
    return _.map(quests, ({ label, description }) => ({
      text: `[${label}] ${description}`,
      value: label,
    }));
  },
  rewards(context, { quests }) {
    return _.map(quests, ({ label, rewards }) => {
      const rewardText = _.map(rewards, _.partial(getRewardText, context)).join(' ');
      return { text: `[${label}] ${rewardText}`, value: label };
    });
  },
};

export const composer = ({ context }, onData) => {
  const { Store } = context();
  const { search: { mode }, quests: { data } } = Store.getState();
  if (!_.has(itemFactory, mode)) {
    onData(new Error(`Unknown search mode: ${mode}`));
    return;
  }
  onData(null, {
    items: itemFactory[mode](context(), { quests: data }),
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
