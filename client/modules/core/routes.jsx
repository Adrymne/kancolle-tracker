import React from 'react';
import { mount } from 'react-mounter';

import MainLayout from './components/main_layout';
import ExpeditionCalculator from '../expedition/components/calculator';
import QuestDisplay from '../quest/containers/quest_display';

export default function (injectDeps, { FlowRouter }) {
  const context = injectDeps(MainLayout);

  FlowRouter.route('/', {
    name: 'questTree',
    action() {
      mount(context, {
        content: () => (<QuestDisplay />),
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
}
