import { Quests } from '/lib/collections';
import { Meteor } from 'meteor/meteor';

export default function () {
  Meteor.publish('quests.list', function () {
    const selector = {};
    const options = {};

    return Quests.find(selector, options);
  });
}
