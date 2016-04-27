import calculateSvgSize from '../libs/svg_size';

function getInitialState() {
  return {
    ...calculateSvgSize(),
  };
}

export default {
  svg(state = getInitialState(), action) {
    switch (action.type) {
      case 'SET_SVG_SIZE':
        return {
          ...state,
          width: action.width,
          height: action.height,
        };
      default:
        return state;
    }
  },
};
