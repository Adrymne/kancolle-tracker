import React from 'react';

// from https://github.com/cpettitt/dagre-d3/blob/master/lib/arrows.js
const Arrow = ({ id }) => (
  <marker id={id}
    viewBox="0 0 10 10"
    refX={9} refY={5}
    markerWidth={8} markerHeight={6}
    markerUnits="strokeWidth"
    orient="auto"
  >
    <path d="M 0 0 L 10 5 L 0 10 z"
      style={{
        strokeWidth: 1,
        strokeDashArray: '1,0',
      }}
    />
  </marker>
);
Arrow.propTypes = {
  id: React.PropTypes.string.isRequired,
};

export default Arrow;
