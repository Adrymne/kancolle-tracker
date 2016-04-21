import React from 'react';
import { Grid, Row } from 'react-bootstrap';

// TODO: Nav bar
const Layout = ({ content = () => null }) => (
  <Grid>
    <Row>
      <h1>Expedition Calculator</h1>
      {content()}
    </Row>
  </Grid>
);

export default Layout;
