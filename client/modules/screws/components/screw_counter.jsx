import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { ScrewBase, ScrewQuests, ScrewMedals, ScrewEndDate, ScrewOutput } from '../containers';

const ScrewCounter = () => (
  <div>
    <Row>
      <Col xs={6}>
        <Row>
          <Col xs={6}>
            <ScrewBase />
          </Col>
          <Col xs={6}>
            <ScrewEndDate />
          </Col>
        </Row>
      </Col>
      <Col xs={6}>
        <ScrewOutput />
      </Col>
    </Row>
    <ScrewQuests />
    <ScrewMedals />
  </div>
);

export default ScrewCounter;
