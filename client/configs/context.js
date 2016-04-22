import * as Collections from '/lib/collections';
import { Meteor } from 'meteor/meteor';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { createStore } from 'redux';

export default function ({ rootReducer }) {
  return {
    Meteor,
    FlowRouter,
    Collections,
    Store: createStore(rootReducer, undefined,
      window.devToolsExtension ? window.devToolsExtension() : undefined
    ),
  };
}
