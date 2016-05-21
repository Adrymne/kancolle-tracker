import { createApp } from 'mantra-core';
import initContext from './configs/context.js';
import { combineReducers } from 'redux';

// load modules
import coreModule from './modules/core';
import questModule from './modules/quest';
import expeditionModule from './modules/expedition';
import scrappablesModule from './modules/scrappables';

const rootReducer = combineReducers({
  ...questModule.reducers,
  ...expeditionModule.reducers,
  ...scrappablesModule.reducers,
});

// init app context
const context = initContext({ rootReducer });

// create app
const app = createApp(context);
app.loadModule(coreModule);
app.loadModule(questModule);
app.loadModule(expeditionModule);
app.loadModule(scrappablesModule);
app.init();
