import { Ships } from '/lib/collections';
import { Meteor } from 'meteor/meteor';

export default function () {
  Meteor.publish('ships.list', function () {
    const selector = {};
    const options = {};

    return Ships.find(selector, options);
  });
}
