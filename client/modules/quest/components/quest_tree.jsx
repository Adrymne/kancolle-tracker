import React from 'react';
import Quest from '../containers/quest';

const QuestTree = ({ size, quests }) => {
  if (!quests) {
    return <p>Loading...</p>;
  }
  return (
  <svg
    width={size.width} height={size.height}
    style={{ border: '1px solid rgb(170,170,170)' }}
  >
    <g>
      {(quests || []).map(quest => (
        <Quest key={quest._id} {...quest} />
      ))}
    </g>
  </svg>
  );
};
QuestTree.propTypes = {
  size: React.PropTypes.object.isRequired,
  quests: React.PropTypes.array.isRequired,
};

export default QuestTree;
