import React from 'react';
import _ from 'lodash';
import Prerequisite from '../containers/prerequisite';

const Prerequisites = ({ quests }) => {
  if (_.isEmpty(quests)) {
    return null;
  }
  return (
    <ul className="list-unstyled">
      {quests.map((quest) => (
          <Prerequisite key={quest._id} quest={quest} />
      ))}
    </ul>
  );
};
Prerequisites.propTypes = {
  quests: React.PropTypes.array,
};

export default Prerequisites;
