import { Expeditions } from '/lib/collections';
import { Meteor } from 'meteor/meteor';

export default function () {
  Meteor.publish('expeditions.list', function () {
    const selector = {};
    const options = {};

    return Expeditions.find(selector, options);
  });
}
