import React from 'react';
import { Grid, Row } from 'react-bootstrap';
import ResultTable from '../containers/ResultTable';
import Options from '../containers/Options';

const Calculator = () => (
  <Grid>
    <Row>
      <Options />
    </Row>
    <Row>
      <ResultTable />
    </Row>
  </Grid>
);

export default Calculator;
