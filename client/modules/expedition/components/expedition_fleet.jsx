import React from 'react';

const sparkled = {
  color: 'gold',
};
const unsparkled = {
  color: 'black',
};
const ExpeditionFleet = ({ fleet, isSparkled }) => (
  <div style={isSparkled ? sparkled : unsparkled}>
  {fleet.reduce((accumulator, ship) => `${accumulator} ${ship.class}`, '')}
  </div>
);
ExpeditionFleet.propTypes = {
  fleet: React.PropTypes.array.isRequired,
  isSparkled: React.PropTypes.bool.isRequired,
};

export default ExpeditionFleet;
