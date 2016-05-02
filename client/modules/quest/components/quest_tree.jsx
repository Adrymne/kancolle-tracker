import React from 'react';
import Quest from '../containers/quest';
import QuestDetails from '../containers/details';
import { HotKeys } from 'react-hotkeys';
import d3 from 'd3';

class QuestTree extends React.Component {
  componentDidMount() {
    const { onResize, onZoom } = this.props;
    window.addEventListener('resize', onResize);

    const zoom = d3.behavior.zoom()
        .scaleExtent([0.1, 1])
        .on('zoom', onZoom);
    this.d3Select().call(zoom);
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
    const { width, height, quests, keybinds } = this.props;
    return (
      <HotKeys focused attach={window} handlers={keybinds}>
      <svg
        width={width} height={height}
        style={{ border: '1px solid rgb(170,170,170)' }}
      >
        <g className="quest-tree">
          {quests.map(quest => (
            <Quest key={quest._id} {...quest} />
          ))}
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
  keybinds: React.PropTypes.object.isRequired,
};

export default QuestTree;
