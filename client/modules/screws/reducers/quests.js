import _ from 'lodash';

export const loadQuests = (state, { quests }) => _.mapValues(quests, (quest, id) => ({
  ...quest,
  isActive: _.isNil(state[id] && state[id].isActive) ? true : state[id].isActive,
}));

export const toggleQuest = (state, { id }) => ({
  ...state,
  [id]: { ...state[id], isActive: !state[id].isActive },
});
