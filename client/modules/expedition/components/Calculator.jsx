import React from 'react';
import { Grid, Row } from 'react-bootstrap';
import ResultTable from '../containers/result_table';
import Options from '../components/options';

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
