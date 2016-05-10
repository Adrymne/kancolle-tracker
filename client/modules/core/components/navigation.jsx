import React from 'react';
import { Navbar, Nav, NavItem } from 'react-bootstrap';

const Navigation = () => (
  <Navbar>
    <Nav>
      <NavItem href="/">Quest Tree</NavItem>
      <NavItem href="/expedition-calculator">Expedition Calculator</NavItem>
      <NavItem href="/scrappables">Scrappables</NavItem>
    </Nav>
  </Navbar>
);

export default Navigation;
