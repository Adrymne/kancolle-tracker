import Edge from '../components/edge';
import { useDeps, composeAll } from 'mantra-core';
import { composeWithRedux } from '/lib/util';
import d3 from 'd3';
import _ from 'lodash';

// from https://github.com/cpettitt/dagre-d3/blob/8de0e5f8638c85667f9507a52957e0269739c05c/lib/intersect/intersect-rect.js
function intersect(node, point) {
  const dx = point.x - node.x;
  const dy = point.y - node.y;
  // TODO: Get node dimensions... somehow
  let w = (node.width || 36.9375) / 2;
  let h = (node.height || 36.5) / 2;
  let sx;
  let sy;
  if (Math.abs(dy) * w > Math.abs(dx) * h) {
    // Intersection is top or bottom of rect.
    if (dy < 0) {
      h = -h;
    }
    sx = dy === 0 ? 0 : h * dx / dy;
    sy = h;
  } else {
    // Intersection is left or right of rect.
    if (dx < 0) {
      w = -w;
    }
    sx = w;
    sy = dx === 0 ? 0 : w * dy / dx;
  }
  return { x: node.x + sx, y: node.y + sy };
}

// based on https://github.com/cpettitt/dagre-d3/blob/master/lib/create-edge-paths.js
function createLine(points) {
  const line = d3.svg.line()
      .x(d => d.x)
      .y(d => d.y);
  return line(points);
}

// based on https://github.com/cpettitt/dagre-d3/blob/master/lib/create-edge-paths.js
function buildPath({ state }, { points, v, w }) {
  const head = _.find(state.quests.nodes, { _id: w });
  const tail = _.find(state.quests.nodes, { _id: v });
  return createLine([
    intersect(tail, points[1]),
    ...points.slice(1, points.length - 1),
    intersect(head, points[points.length - 2]),
  ]);
}

export const composer = ({ context, edge }, onData) => {
  const { Store } = context();
  const state = Store.getState();
  onData(null, {
    path: buildPath({ state }, edge),
    id: `${edge.w}-${edge.v}`,
  });
};

export default composeAll(
  composeWithRedux(composer),
  useDeps()
)(Edge);
