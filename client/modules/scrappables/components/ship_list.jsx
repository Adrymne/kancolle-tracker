import React from 'react';

const ShipList = ({ ships }) => (
  <ul className="list-inline">
    {ships.map((ship, index) => (<li key={index}>{ship}</li>))}
  </ul>
);
ShipList.propTypes = {
  ships: React.PropTypes.array.isRequired,
};

export default ShipList;
