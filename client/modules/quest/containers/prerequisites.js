import Prerequisites from '../components/prerequisites';
import { useDeps, composeWithTracker, composeAll } from 'mantra-core';

function isComplete() {
  return false;
}

function getPrereqs(context, questId) {
  const { Collections: { Quests } } = context;
  if (isComplete(context, questId)) {
    return [];
  }
  const quest = Quests.find(questId).fetch()[0];
  if (!quest) {
    throw new Error(`Couldn't find quest with id ${questId}`);
  }
  return (quest.requires || []).reduce((results, prereqId) =>
    results.concat(getPrereqs(context, prereqId))
  , [quest]);
}

export const composer = ({ context, quests }, onData) => {
  const { Meteor } = context();
  if (!Meteor.subscribe('quests.list').ready()) {
    return;
  }
  try {
    onData(null, {
      quests: quests.reduce((result, questId) =>
        result.concat(getPrereqs(context(), questId))
      , []),
    });
  } catch (e) {
    onData(e);
  }
};

export default composeAll(
  composeWithTracker(composer),
  useDeps()
)(Prerequisites);
