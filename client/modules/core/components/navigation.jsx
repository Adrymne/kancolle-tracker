import React from 'react';
import { Navbar, Nav, NavItem } from 'react-bootstrap';

const Navigation = () => (
  <Navbar>
    <Nav>
      <NavItem href="/">Quest Tree</NavItem>
      <NavItem href="/expedition-calculator">Expedition Calculator</NavItem>
    </Nav>
  </Navbar>
);

export default Navigation;
