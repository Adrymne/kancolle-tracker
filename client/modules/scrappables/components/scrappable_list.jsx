import React from 'react';
import ShipList from '../containers/ship_list';
import { Nav, NavItem } from 'react-bootstrap';

const ScrappableList = ({ types, onTabSelect, mode }) => (
  <div>
    <Nav bsStyle="pills" justified activeKey={mode} onSelect={onTabSelect}>
      <NavItem eventKey={"scrappables"}>Scrappables</NavItem>
      <NavItem eventKey={"required"}>Required</NavItem>
    </Nav>
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
  onTabSelect: React.PropTypes.func.isRequired,
  mode: React.PropTypes.string.isRequired,
};

export default ScrappableList;
