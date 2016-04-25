import React from 'react';
import { Grid, Row } from 'react-bootstrap';
import Navigation from './navigation';

// TODO: Nav bar
const Layout = ({ content = () => null }) => (
  <div>
    <Navigation />
    <Grid>
      <Row>
        {content()}
      </Row>
    </Grid>
  </div>
);
Layout.propTypes = {
  content: React.PropTypes.func,
};

export default Layout;
