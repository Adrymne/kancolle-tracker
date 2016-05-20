import React from 'react';
import { Grid, Row } from 'react-bootstrap';
import DocumentTitle from 'react-document-title';
import Navigation from './navigation';

// TODO: Nav bar
const Layout = ({ content = () => null }) => (
  <div>
    <DocumentTitle title="Kancolle Tracker" />
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
