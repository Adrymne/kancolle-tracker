import { Items } from '/lib/collections';
import { Meteor } from 'meteor/meteor';

export default function () {
  Meteor.publish('items.list', function () {
    const selector = {};
    const options = {};

    return Items.find(selector, options);
  });
}
