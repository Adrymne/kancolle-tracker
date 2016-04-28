import { compose } from 'mantra-core';

// from https://esdiscuss.org/topic/es6-iteration-over-object-values
export const entries = function* entries(obj) {
  for (const key of Object.keys(obj)) {
    yield [key, obj[key]];
  }
};

export const composeWithRedux = (func) =>
  compose((props, onData) => {
    const { context } = props;
    const { Store } = context();
    const cb = func.bind(this, props, onData);
    cb();
    return Store.subscribe(cb);
  });
