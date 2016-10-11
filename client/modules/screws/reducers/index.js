import moment from 'moment';
import { loadQuests, toggleQuest } from './quests';

const DEFAULT = {
  quests: {},
  medals: 0,
  base: 0,
  endDate: moment().format('YYYY-MM-DD'),
};

export default {
  screws(state = DEFAULT, action) {
    switch (action.type) {
      case 'SET_SCREW_BASE':
        return { ...state, base: action.base };
      case 'LOAD_SCREW_QUESTS':
        return { ...state, quests: loadQuests(state.quests, action) };
      case 'TOGGLE_SCREW_QUEST':
        return { ...state, quests: toggleQuest(state.quests, action) };
      case 'SET_SCREW_MEDALS':
        return { ...state, medals: action.medals };
      case 'SET_SCREW_END_DATE':
        return { ...state, endDate: action.endDate };
      default:
        return state;
    }
  },
};
