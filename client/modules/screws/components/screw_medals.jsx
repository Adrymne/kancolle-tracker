import React from 'react';

const ScrewMedals = ({ medals, onChange }) => (
  <div>
    <div className="page-header">
      <h4>Medals <small>(per month)</small></h4>
    </div>
    <input type="number" value={medals} onChange={(e) => onChange(e.target.value)} />
  </div>
);
ScrewMedals.propTypes = {
  medals: React.PropTypes.number.isRequired,
  onChange: React.PropTypes.func.isRequired,
};

export default ScrewMedals;
