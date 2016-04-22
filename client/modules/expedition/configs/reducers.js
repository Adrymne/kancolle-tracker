const DEFAULT_WEIGHT = {
  fuel: 5,
  ammo: 3,
  steel: 3,
  bauxite: 2,
};

export default {
  resourceWeight(state = DEFAULT_WEIGHT, action) {
    switch (action.type) {
      case 'SET_RESOURCE_WEIGHT':
        return {
          ...state,
          [action.resource]: action.weight,
        };
      default:
        return state;
    }
  },
};
