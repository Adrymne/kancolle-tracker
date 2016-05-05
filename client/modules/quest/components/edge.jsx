import React from 'react';
import Arrow from './edge_arrow';

const Edge = ({ path, id }) => (
  <g>
    <path d={path}
      style={{
        fill: 'none',
        stroke: '#333',
      }}
      markerEnd={`url(#${id})`}
    />
    <Arrow id={id} />
  </g>
);
Edge.propTypes = {
  path: React.PropTypes.string.isRequired,
  id: React.PropTypes.string.isRequired,
};

export default Edge;
