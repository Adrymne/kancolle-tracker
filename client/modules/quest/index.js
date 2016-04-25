import actions from './actions';
import reducers from './configs/reducers';
import loadQuests from './configs/quests';

export default {
  actions,
  reducers,
  load(context, actions) {
    window.addEventListener('resize', actions.svgSize.resize.bind(null, context));
    loadQuests(context, actions);
  },
};
