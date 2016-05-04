import React from 'react';
import Quest from '../containers/quest';
import Edge from '../containers/edge';
import QuestDetails from '../containers/details';
import { HotKeys } from 'react-hotkeys';
import d3 from 'd3';

const QUEST_NODE_PADDING = {
  top: 10,
  right: 10,
  bottom: 10,
  left: 10,
};

class QuestTree extends React.Component {
  componentDidMount() {
    const { onResize, onZoom, loadQuestNodeDimensions } = this.props;
    window.addEventListener('resize', onResize);

    const zoom = d3.behavior.zoom()
        .scaleExtent([0.1, 1])
        .on('zoom', onZoom);
    this.d3Select().call(zoom);
    loadQuestNodeDimensions({ padding: QUEST_NODE_PADDING });
  }
  componentWillUnmount() {
    const { onResize } = this.props;
    window.removeEventListener('resize', onResize);
    this.d3Select().on('.zoom', null);
  }

  d3Select() {
    return d3.select('svg');
  }

  render() {
    const { width, height, quests, keybinds, edges } = this.props;
    return (
      <HotKeys focused attach={window} handlers={keybinds}>
      <svg
        width={width} height={height}
        style={{ border: '1px solid rgb(170,170,170)' }}
      >
        <g className="quest-tree">
          {edges.map((edge, index) => <Edge key={index} edge={edge} />)}
          {quests.map(quest => <Quest key={quest._id} {...quest} />)}
        </g>
        <QuestDetails />
      </svg>
      </HotKeys>
    );
  }
}
QuestTree.propTypes = {
  width: React.PropTypes.string.isRequired,
  height: React.PropTypes.string.isRequired,
  onResize: React.PropTypes.func.isRequired,
  onZoom: React.PropTypes.func.isRequired,
  quests: React.PropTypes.array.isRequired,
  edges: React.PropTypes.array.isRequired,
  keybinds: React.PropTypes.object.isRequired,
  loadQuestNodeDimensions: React.PropTypes.func.isRequired,
};

export default QuestTree;
