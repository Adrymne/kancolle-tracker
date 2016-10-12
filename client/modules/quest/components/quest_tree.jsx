import React from 'react';
import Quest from '../containers/quest';
import Edge from '../containers/edge';
import QuestDetails from '../containers/details';
import Search from '../containers/search';
import { HotKeys } from 'react-hotkeys';
import d3 from 'd3';

const QUEST_NODE_PADDING = {
  top: 10,
  right: 10,
  bottom: 10,
  left: 10,
};

class QuestTree extends React.Component {
  constructor(props) {
    super(props);
    const { onZoom } = props;

    const zoom = d3.behavior.zoom()
        .scaleExtent([0.1, 1])
        .on('zoom', onZoom);
    this.state = { zoom };
  }
  componentDidMount() {
    const { onResize, loadQuestNodeDimensions } = this.props;
    const { zoom } = this.state;
    window.addEventListener('resize', onResize);

    this.d3Select().call(zoom);
    loadQuestNodeDimensions({ padding: QUEST_NODE_PADDING });
  }
  componentWillUnmount() {
    const { onResize, saveQuestCompletion } = this.props;
    window.removeEventListener('resize', onResize);
    this.d3Select().on('.zoom', null);
    saveQuestCompletion();
  }

  d3Select() {
    return d3.select('svg');
  }

  render() {
    const { width, height, quests, keyHandlers, edges, centreOn } = this.props;
    const { zoom } = this.state;
    if (centreOn) {
      zoom.scale(1).translate([centreOn.x, centreOn.y]).event(this.d3Select());
    }
    return (
      <div>
      <HotKeys focused attach={window} handlers={keyHandlers}>
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
      <Search />
      </div>
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
  loadQuestNodeDimensions: React.PropTypes.func.isRequired,
  saveQuestCompletion: React.PropTypes.func.isRequired,
  keyHandlers: React.PropTypes.object.isRequired,
};

export default QuestTree;
