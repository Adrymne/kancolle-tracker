// from https://esdiscuss.org/topic/es6-iteration-over-object-values
export const entries = function* entries(obj) {
  for (const key of Object.keys(obj)) {
    yield [key, obj[key]];
  }
};
