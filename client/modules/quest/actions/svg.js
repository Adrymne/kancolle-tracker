import calculateSvgSize from '../libs/svg_size';
import d3 from 'd3';

export default {
  resize({ Store }) {
    Store.dispatch({
      type: 'SET_SVG_SIZE',
      ...calculateSvgSize(),
    });
  },
  zoom() {
    // xxx: Directly set the SVG attribute - using React's state causes unacceptable slowdown
    d3.select('.quest-tree').attr('transform',
      `translate(${d3.event.translate}) scale(${d3.event.scale})`);
  },
};
