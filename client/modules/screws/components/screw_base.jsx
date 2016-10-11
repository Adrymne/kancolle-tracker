import React from 'react';

const ScrewBase = ({ base, onChange }) => (
  <label>
    Screws:
    <input type="number" value={base} onChange={(e) => onChange(e.target.value)} />
  </label>
);
ScrewBase.propTypes = {
  base: React.PropTypes.number.isRequired,
  onChange: React.PropTypes.func.isRequired,
};

export default ScrewBase;
