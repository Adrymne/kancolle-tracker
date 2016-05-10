import React from 'react';
import ShipList from '../containers/ship_list';

const ScrappableList = ({ types }) => (
  <div>
    <h2>Scrappables</h2>
    {types.map(({ type, text }, index) => (
      <div key={index}>
        <h4>{text}</h4>
        <ShipList type={type} />
      </div>
    ))}
  </div>
);
ScrappableList.propTypes = {
  types: React.PropTypes.array.isRequired,
};

export default ScrappableList;
