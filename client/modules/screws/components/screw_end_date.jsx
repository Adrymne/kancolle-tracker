import React from 'react';

const ScrewEndDate = ({ endDate, onChange }) => (
  <label>
    Target Date:
    <input type="date" value={endDate} onChange={(e) => onChange(e.target.value)} />
  </label>
);
ScrewEndDate.propTypes = {
  endDate: React.PropTypes.string.isRequired,
  onChange: React.PropTypes.func.isRequired,
};

export default ScrewEndDate;
