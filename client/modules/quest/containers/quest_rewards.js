import QuestRewards from '../components/quest_rewards';
import { useDeps, composeAll, composeWithTracker } from 'mantra-core';
import _ from 'lodash';
import { toString } from '../libs/rewards';

export const composer = ({ context, rewards }, onData) => {
  if (_.isEmpty(rewards)) {
    onData(null, { rewards });
  }
  onData(null, {
    rewards: rewards.map(_.partial(toString, context())),
  });
};

export default composeAll(
  composeWithTracker(composer),
  useDeps()
)(QuestRewards);
