import calculateSvgSize from '../../libs/svg_size';

export default {
  svgSize(state = calculateSvgSize(), action) {
    switch (action.type) {
      case 'SET_SVG_SIZE':
        return {
          width: action.width,
          height: action.height,
        };
      default:
        return state;
    }
  },
};
