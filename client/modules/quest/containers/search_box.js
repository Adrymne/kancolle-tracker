import SearchBox from '../components/search_box';
import { useDeps, composeWithTracker, composeAll } from 'mantra-core';
import { composeWithRedux, entries } from '/lib/util';
import _ from 'lodash';

class RewardData {
  constructor({ ships, items }) {
    this.rewards = {
      ship: ships,
      item: items,
    };
  }

  name(spec) {
    for (const [type, dataList] of entries(this.rewards)) {
      const rewardId = spec[type];
      if (rewardId) {
        return _.find(dataList, { _id: rewardId }).name;
      }
    }
    return spec.name || '';
  }

  quantity({ num }) {
    return num ? ` x${num}` : '';
  }

  toString(spec) {
    return this.name(spec) + this.quantity(spec);
  }
}

const itemFactory = {
  description(quests) {
    return _.map(quests, (quest, _id) => ({
      value: _id,
      text: `[${_id}] ${quest.description}`,
    }));
  },
  rewards(quests, rewardData) {
    return _.map(quests, (quest, _id) => {
      const rewardString = _.map(quest.rewards, (reward) =>
        rewardData.toString(reward)
      ).join(' ');
      return {
        value: _id,
        text: `[${_id}] ${rewardString}`,
      };
    });
  },
};

function getItems({ mode, rewardData }, quests) {
  if (!mode) {
    return [];
  }
  return itemFactory[mode](quests, rewardData);
}

export const reduxComposer = ({ context, rewardData }, onData) => {
  const { Store } = context();
  const { quests: { data: quests }, search: opts } = Store.getState();
  onData(null, {
    items: getItems({ ...opts, rewardData }, quests),
  });
};

export const collectionComposer = ({ context }, onData) => {
  const { Meteor, Collections } = context();
  if (!(Meteor.subscribe('items.list').ready() &&
    Meteor.subscribe('ships.list').ready())) {
    return;
  }
  onData(null, {
    rewardData: new RewardData({
      ships: Collections.Ships.find().fetch(),
      items: Collections.Items.find().fetch(),
    }),
  });
};

export const depsMapper = (context, actions) => ({
  onItemSelected: actions.search.setSearchResult,
  cancelSearch: actions.search.cancelSearch,
  context: () => context,
});

export default composeAll(
  composeWithRedux(reduxComposer),
  composeWithTracker(collectionComposer),
  useDeps(depsMapper)
)(SearchBox);
