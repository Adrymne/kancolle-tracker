import QuestRewards from '../components/quest_rewards';
import { useDeps, composeAll, composeWithTracker } from 'mantra-core';
import _ from 'lodash';

class RewardInfo {
  constructor({ Ships, Items }) {
    this.types = {
      ship: (id) => Ships.findOne(id),
      item: (id) => Items.findOne(id),
    };
  }

  name(reward) {
    const type = _.find(_.keys(this.types), (rewardType) =>
      !! _.has(reward, rewardType)
    );
    if (!type) {
      return reward.name;
    }
    return this.types[type](reward[type]).name;
  }

  quantity(reward) {
    return (reward.num) ? `x${reward.num}` : '';
  }

  toString(reward) {
    return `${this.name(reward)} ${this.quantity(reward)}`;
  }
}

export const composer = ({ context, rewards }, onData) => {
  if (_.isEmpty(rewards)) {
    onData(null, { rewards });
  }
  const { Meteor, Collections } = context();
  if (!(Meteor.subscribe('ships.list').ready() &&
    Meteor.subscribe('items.list').ready())) {
    return;
  }
  const rewardInfo = new RewardInfo(Collections);
  onData(null, {
    rewards: rewards.map((reward) => rewardInfo.toString(reward)),
  });
};

export default composeAll(
  composeWithTracker(composer),
  useDeps()
)(QuestRewards);
