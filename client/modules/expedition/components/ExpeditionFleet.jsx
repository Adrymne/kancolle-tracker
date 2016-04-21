import React from 'react';

// TODO: style fleet based on ship.isSparkle
const ExpeditionFleet = ({ fleet }) => (
  <div>
  {fleet.reduce((accumulator, ship) => `${accumulator} ${ship.class}`, '')}
  </div>
);
ExpeditionFleet.propTypes = {
  fleet: React.PropTypes.array.isRequired,
};

export default ExpeditionFleet;
