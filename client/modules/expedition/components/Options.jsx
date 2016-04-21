import React from 'react';
import { Panel } from 'react-bootstrap';

const RESOURCES = ['fuel', 'ammo', 'steel', 'bauxite'];

const Options = () => (
  <Panel>
    <form className="form-inline row">
      {RESOURCES.map((name) => (
        <div className="form-group col-xs-3">
          <label htmlFor={`${name}-score-input`} style={{ marginRight: '4px' }}>
            {`${name}:`}
          </label>
          <input type="text" key={`${name}-score-input`} value={1}
            style={{ textAlign: 'center' }}
          />
        </div>
      ))}
    </form>
  </Panel>
);

export default Options;
