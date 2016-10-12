import React from 'react';
import { HotKeys } from 'react-hotkeys';
import { Grid, Row } from 'react-bootstrap';
import DocumentTitle from 'react-document-title';
import Navigation from './navigation';
import keyMap from '../configs/hotkeys';

const Layout = ({ content = () => null }) => (
  <HotKeys keyMap={keyMap}>
    <DocumentTitle title="Kancolle Tracker" />
    <Navigation />
    <Grid>
      <Row>
        {content()}
      </Row>
    </Grid>
  </HotKeys>
);
Layout.propTypes = {
  content: React.PropTypes.func,
};

export default Layout;
