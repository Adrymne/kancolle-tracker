import React from 'react';
import _ from 'lodash';

const ScrewQuests = ({ repeatableQuests, onChange }) => (
  <div>
    <div className="page-header">
      <h4>Quests</h4>
    </div>
    {_.map(repeatableQuests, (quests, type) => (
      <div key={type}>
        <h5><p className="text-capitalize">{type}</p></h5>
        {_.map(quests, ({ id, isChecked }, qIndex) => (
          <label className="checkbox-inline" key={qIndex}>
            <input type="checkbox" checked={isChecked} onChange={_.partial(onChange, id)} />
            {id}
          </label>
        ))}
      </div>
    ))}
  </div>
);
ScrewQuests.propTypes = {
  repeatableQuests: React.PropTypes.object.isRequired,
  onChange: React.PropTypes.func.isRequired,
};

export default ScrewQuests;
