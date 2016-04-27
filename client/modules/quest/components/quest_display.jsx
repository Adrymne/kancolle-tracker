import React from 'react';
import QuestTree from '../containers/quest_tree';
import d3 from 'd3';

class QuestDisplay extends React.Component {
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
    const { width, height, isLoading } = this.props;
    return (
      <svg
        width={width} height={height}
        style={{ border: '1px solid rgb(170,170,170)' }}
      >
        {isLoading ? '' : <QuestTree />}
      </svg>
    );
  }
}
QuestDisplay.propTypes = {
  width: React.PropTypes.string.isRequired,
  height: React.PropTypes.string.isRequired,
  isLoading: React.PropTypes.bool.isRequired,
  onResize: React.PropTypes.func.isRequired,
  onZoom: React.PropTypes.func.isRequired,
};

export default QuestDisplay;
