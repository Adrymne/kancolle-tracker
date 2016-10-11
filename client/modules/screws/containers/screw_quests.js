import { composeAll, useDeps } from 'mantra-core';
import _ from 'lodash';
import { composeWithRedux } from '/lib/util';
import { ScrewQuests } from '../components';

export const reduxComposer = ({ context }, onData) => {
  const { Store } = context();
  const { screws: { quests } } = Store.getState();
  const repeatableQuests = {};
  _.each(quests, ({ isActive, type }, id) => {
    if (!repeatableQuests[type]) {
      repeatableQuests[type] = [];
    }
    repeatableQuests[type].push({ id, isChecked: isActive });
  });
  onData(null, { repeatableQuests });
};

export const depsMapper = (context, actions) => ({
  context: () => context,
  onChange: actions.screwInput.toggleQuest,
});

export default composeAll(
  composeWithRedux(reduxComposer),
  useDeps(depsMapper)
)(ScrewQuests);
