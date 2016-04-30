import React from 'react';
import _ from 'lodash';

const QuestRewards = ({ rewards }) => {
  if (_.isEmpty(rewards)) {
    return null;
  }
  return (
    <ul className="list-inline">
      {rewards.map((reward, index) => (
        <li key={index}>{reward}</li>
      ))}
    </ul>
  );
};
QuestRewards.propTypes = {
  rewards: React.PropTypes.array,
};

export default QuestRewards;
