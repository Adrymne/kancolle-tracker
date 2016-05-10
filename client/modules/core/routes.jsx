import React from 'react';
import { mount } from 'react-mounter';

import MainLayout from './components/main_layout';
import ExpeditionCalculator from '../expedition/components/calculator';
import QuestTree from '../quest/containers/quest_tree';
import ScrappableList from '../scrappables/containers/scrappable_list';

export default function (injectDeps, { FlowRouter }) {
  const context = injectDeps(MainLayout);

  FlowRouter.route('/', {
    name: 'questTree',
    action() {
      mount(context, {
        content: () => (<QuestTree />),
      });
    },
  });

  FlowRouter.route('/expedition-calculator', {
    name: 'expeditionCalculator',
    action() {
      mount(context, {
        content: () => (<ExpeditionCalculator />),
      });
    },
  });

  FlowRouter.route('/scrappables', {
    name: 'scrappables',
    action() {
      mount(context, {
        content: () => (<ScrappableList />),
      });
    },
  });
}
