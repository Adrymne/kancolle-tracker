export default {
  set({ Store }, resource, weight) {
    Store.dispatch({
      type: 'SET_RESOURCE_WEIGHT',
      resource,
      weight: parseFloat(weight),
    });
  },
};
