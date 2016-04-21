import { createApp } from 'mantra-core';
import initContext from './configs/context.js';

// load modules
import coreModule from './modules/core';

// init app context
const context = initContext();

// create app
const app = createApp(context);
app.loadModule(coreModule);
app.init();
