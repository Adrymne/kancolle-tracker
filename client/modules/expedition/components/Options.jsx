import React from 'react';
import { Panel } from 'react-bootstrap';
import ResourceWeightInput from '../containers/ResourceWeightInput';

const RESOURCES = ['fuel', 'ammo', 'steel', 'bauxite'];

const Options = () => (
  <Panel>
    <form className="form-inline row">
    {RESOURCES.map((name, index) => (
      <ResourceWeightInput
        key={index}
        resource={name}
        size={`col-xs-${12 / RESOURCES.length}`}
      />
    ))}
    </form>
  </Panel>
);

export default Options;
