import React from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import QuestRewards from '../containers/quest_rewards';

const MODAL_STYLE = {
  pointerEvents: 'none',
  x: '59%',
  y: '1%',
  width: '40%',
  height: '98%',
};

const Details = (selectedQuest) => {
  if (!selectedQuest) {
    return '';
  }
  const { _id, name, jp, description, rewards } = selectedQuest;
  return (
    <g style={{ backgroundColor: 'rgba(0, 0, 0, 0)' }}>
      <foreignObject style={MODAL_STYLE}>
        <Grid style={{
          backgroundColor: '#fff',
          width: '100%',
          border: '1px solid rgb(170,170,170)',
        }}
        >
          <Row><Col xs={12}>
            <h4>
              <b>{`[${_id}] `}</b>
              {name}
            </h4>
            <h4><small>{jp}</small></h4>
            <p>{description}</p>
            <QuestRewards rewards={rewards} />
          </Col></Row>
        </Grid>
      </foreignObject>
    </g>
  );
};
Details.propTypes = {
  _id: React.PropTypes.string,
  name: React.PropTypes.string,
  jp: React.PropTypes.string,
  description: React.PropTypes.string,
};

export default Details;
