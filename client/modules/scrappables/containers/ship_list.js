import ShipList from '../components/ship_list';
import { useDeps, composeAll, composeWithTracker } from 'mantra-core';
import { composeWithRedux } from '/lib/util';
import _ from 'lodash';

// get ships not required by incomplete quests of specified class
export const shipComposer = ({ context, type = { $exists: false }, requiredShips, mode }, onData) => {
  const { Meteor, Collections } = context();
  if (!Meteor.subscribe('ships.list').ready()) {
    return;
  }
  let ships = Collections.Ships.find({ class: type }).fetch();
  if (mode === 'required') {
    ships = _.intersectionWith(ships, requiredShips, (ship, id) => ship._id === id);
  } else {
    ships = _.differenceWith(ships, requiredShips, (ship, id) => ship._id === id);
  }
  ships = _(ships)
    .sortBy('name')
    .map((ship) => `${ship.name}${ship.jp ? ` (${ship.jp})` : ''}`)
    .value();
  onData(null, { ships });
};

// get ships required by incomplete quests
export const completionComposer = ({ context, quests }, onData) => {
  const { Store } = context();
  const state = Store.getState();
  const incompleteQuests = quests.filter((quest) =>
    state.quests.completion[quest._id] !== 'complete'
  );
  const requiredShips = _.chain(incompleteQuests)
    .reduce((list, quest) => list.concat(quest.ships), [])
    .uniq()
    .value();
  onData(null, { requiredShips, mode: state.scrappables.mode });
};

// get quests from collection
export const questsComposer = ({ context }, onData) => {
  const { Meteor, Collections } = context();
  if (Meteor.subscribe('quests.list').ready()) {
    onData(null, {
      quests: Collections.Quests.find().fetch(),
    });
  }
};

export default composeAll(
  composeWithTracker(shipComposer),
  composeWithRedux(completionComposer),
  composeWithTracker(questsComposer),
  useDeps()
)(ShipList);
