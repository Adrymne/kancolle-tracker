import PrerequisiteList from '../components/prerequisite_list';
import { useDeps, composeWithTracker, composeAll } from 'mantra-core';
import { composeWithRedux } from '/lib/util';

const isActive = ({ completion }, id) => completion[id] === 'active';
const isComplete = ({ completion }, id) => completion[id] === 'complete';
const isRepeatable = ({ quests }, id) => !! quests[id].repeatable;

function getPrereqs(context, questId) {
  const { Quests } = context;
  if (isComplete(context, questId) && !isRepeatable(context, questId)) {
    return [];
  }
  const quest = Quests.find(questId).fetch()[0];
  if (!quest) {
    throw new Error(`Couldn't find quest with id ${questId}`);
  }
  if (isActive(context, quest._id)) {
    return [quest];
  }
  return (quest.requires || []).reduce((results, prereqId) =>
    results.concat(getPrereqs(context, prereqId)), [quest]);
}

export const mongoComposer = ({ context, data, prereqs = [] }, onData) => {
  const { Collections: { Quests } } = context();
  try {
    onData(null, {
      quests: prereqs.reduce((result, questId) =>
        result.concat(getPrereqs({ Quests, ...data }, questId)), []),
    });
  } catch (e) {
    onData(e);
  }
};

export const reduxComposer = ({ context }, onData) => {
  const { Store } = context();
  const { quests: { data: quests, completion } } = Store.getState();
  onData(null, { data: { quests, completion } });
};

export default composeAll(
  composeWithTracker(mongoComposer),
  composeWithRedux(reduxComposer),
  useDeps()
)(PrerequisiteList);
