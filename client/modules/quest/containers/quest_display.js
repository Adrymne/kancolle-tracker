import QuestDisplay from '../components/quest_display';
import { useDeps, composeWithTracker, composeAll } from 'mantra-core';

export const composer = ({ context }, onData) => {
  const { Store } = context();
  const update = () => {
    const state = Store.getState();
    onData(null, {
      ...state.svg,
      isLoading: !state.quests,
    });
  };
  Store.subscribe(update);
};

export const depsMapper = (context, actions) => ({
  onResize: actions.svg.resize,
  onZoom: actions.svg.zoom,
  context: () => context,
});

export default composeAll(
  composeWithTracker(composer),
  useDeps(depsMapper)
)(QuestDisplay);
