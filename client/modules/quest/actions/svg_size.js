import calculateSvgSize from '../libs/svg_size';

export default {
  resize({ Store }) {
    Store.dispatch({
      type: 'SET_SVG_SIZE',
      ...calculateSvgSize(),
    });
  },
};
