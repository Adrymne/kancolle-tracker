import { composeAll, useDeps, composeWithTracker } from 'mantra-core';
import _ from 'lodash';
import Search from '../components/search';
import { toString as getRewardText } from '../libs/rewards';

const itemFactory = {
  description(Collections, { _id, description }) {
    return { label: `[${_id}] ${description}`, value: _id };
  },
  rewards(Collections, { _id, rewards }) {
    const rewardText = _.map(rewards, _.partial(getRewardText, { Collections })).join(' ');
    return { label: `[${_id}] ${rewardText}`, value: _id };
  },
};

export const composer = ({ context }, onData) => {
  const { Collections: { Quests }, Collections } = context();
  const quests = Quests.find().fetch();
  const searchItems = quests.reduce((result, quest) => {
    _.each(result, (items, type) => {
      items.push(itemFactory[type](Collections, quest));
    });
    return result;
  }, { description: [], rewards: [] });
  onData(null, { searchItems });
};

export default composeAll(
  composeWithTracker(composer),
  useDeps()
)(Search);
