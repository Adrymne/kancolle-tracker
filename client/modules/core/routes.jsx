import React from 'react';
import { mount } from 'react-mounter';

import MainLayout from './components/main_layout.jsx';
import ExpeditionCalculator from '../expedition/containers/Calculator.js';

export default function (injectDeps, { FlowRouter }) {
  const context = injectDeps(MainLayout);

  FlowRouter.route('/', {
    name: 'expedition',
    action() {
      mount(context, {
        content: () => (<ExpeditionCalculator />),
      });
    },
  });
}
