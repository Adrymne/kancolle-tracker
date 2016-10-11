import React from 'react';

const ScrewOutput = ({ screws }) => (
  <p className="lead text-center">Screws: {screws}</p>
);
ScrewOutput.propTypes = {
  screws: React.PropTypes.number.isRequired,
};

export default ScrewOutput;
