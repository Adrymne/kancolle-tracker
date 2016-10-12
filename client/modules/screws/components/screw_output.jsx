import React from 'react';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';

const tooltip = (
<Tooltip id="tooltip-screw-count">
  This total does not count rewards in the current reset;
  add active quests' rewards to the base count.
</Tooltip>
);

const ScrewOutput = ({ screws }) => (
  <OverlayTrigger placement="bottom" overlay={tooltip}>
    <p className="lead text-center">Screws: {screws} <small>*</small></p>
  </OverlayTrigger>
);
ScrewOutput.propTypes = {
  screws: React.PropTypes.number.isRequired,
};

export default ScrewOutput;
