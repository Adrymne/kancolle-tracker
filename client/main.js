import { createApp } from 'mantra-core';
import initContext from './configs/context.js';
import { combineReducers } from 'redux';

// load modules
import coreModule from './modules/core';
import expeditionModule from './modules/expedition';

const rootReducer = combineReducers({
  ...expeditionModule.reducers,
});

// init app context
const context = initContext({ rootReducer });

// create app
const app = createApp(context);
app.loadModule(coreModule);
app.loadModule(expeditionModule);
app.init();
