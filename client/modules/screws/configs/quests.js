import { Tracker } from 'meteor/tracker';

const SCREW = 7;
const isScrew = ({ item }) => item === SCREW;

export default function ({ Meteor, Collections: { Quests }, Store }) {
  const questSub = Meteor.subscribe('quests.list');
  Tracker.autorun(() => {
    if (!questSub.ready()) {
      return;
    }
    const questList = Quests.find({
      repeatable: { $exists: true },
      rewards: { $elemMatch: { item: SCREW } },
    }).fetch();
    const quests = {};
    questList.forEach(({ _id: id, description, rewards, repeatable }) => {
      quests[id] = {
        description,
        type: repeatable,
        screws: rewards.find(isScrew).num || 1,
      };
    });
    Store.dispatch({ type: 'LOAD_SCREW_QUESTS', quests });
  });
}
