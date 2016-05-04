import React from 'react';

const Edge = ({ path }) => (
  <g>
    <path d={path}
      style={{
        fill: 'none',
        stroke: '#333',
      }}
    />
  </g>
);
Edge.propTypes = {
  path: React.PropTypes.string.isRequired,
};

export default Edge;
