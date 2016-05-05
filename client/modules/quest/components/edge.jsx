import React from 'react';
import Arrow from './edge_arrow';

const Edge = ({ path, id, state }) => {
  let strokeOpacity;
  switch (state) {
    case 'selected':
      strokeOpacity = 1;
      break;
    case 'complete':
      strokeOpacity = 0;
      break;
    default:
      strokeOpacity = 0.3;
  }
  return (
  <g>
    <path d={path}
      style={{
        fill: 'none',
        stroke: '#333',
        strokeOpacity,
      }}
      markerEnd={`url(#${id})`}
    />
    {state === 'selected' ? <Arrow id={id} /> : null}
  </g>
  );
};
Edge.propTypes = {
  path: React.PropTypes.string.isRequired,
  id: React.PropTypes.string.isRequired,
  state: React.PropTypes.string.isRequired,
};

export default Edge;
