import _ from 'lodash';

const STATE = {
  INACTIVE: 'inactive',
  ACTIVE: 'active',
  COMPLETE: 'complete',
};

function uncomplete({ quests }, _id) {
  let result = {};
  _.each(quests[_id].unlocks, (childId) => {
    result = { ...result, ...uncomplete({ quests }, childId) };
  });
  result[_id] = STATE.ACTIVE;
  return result;
}

function complete({ quests }, _id) {
  let result = {};
  _.each(quests[_id].requires, (childId) => {
    result = { ...result, ...complete({ quests }, childId) };
  });
  result[_id] = STATE.COMPLETE;
  return result;
}

function calculateActive({ state, quests }) {
  return _.mapValues(quests, (quest, _id) => {
    if (state[_id] === STATE.COMPLETE) {
      return STATE.COMPLETE;
    }
    const isActive = _.every(quest.requires, (parentId) =>
      state[parentId] === STATE.COMPLETE
    );
    return isActive ? STATE.ACTIVE : STATE.INACTIVE;
  });
}

export default ({ completion: state }, { _id, quests }) => {
  if (!_id) {
    return state;
  }
  switch (state[_id]) {
    case STATE.COMPLETE:
      return calculateActive({
        state: { ...state, ...uncomplete({ quests }, _id) },
        quests,
      });
    default:
      return calculateActive({
        state: { ...state, ...complete({ quests }, _id) },
        quests,
      });
  }
};
