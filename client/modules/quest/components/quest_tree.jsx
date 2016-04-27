import React from 'react';
import Quest from '../containers/quest';

const QuestTree = ({ quests }) => (
  <g>
    {quests.map(quest => (
      <Quest key={quest._id} {...quest} />
    ))}
  </g>
);
QuestTree.propTypes = {
  quests: React.PropTypes.array.isRequired,
};

export default QuestTree;
