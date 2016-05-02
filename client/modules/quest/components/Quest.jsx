import React from 'react';
import ReactDOM from 'react-dom';
import Label from './label';
import _ from 'lodash';
import d3 from 'd3';

class Quest extends React.Component {
  constructor(props) {
    super(props);
    this.state = { width: 0, height: 0, padding: 10 };
  }

  componentDidMount() {
    const { _id, onClick } = this.props;
    d3.select(this.domNode()).on('click', onClick.bind(null, _id));
    this.updateDimensions();
  }

  componentWillUnmount() {
    d3.select(this.domNode()).on('click', null);
  }

  domNode() {
    return ReactDOM.findDOMNode(this);
  }

  updateDimensions() {
    const { padding } = this.state;
    const bbox = ReactDOM.findDOMNode(this).getBBox();
    const size = {
      width: bbox.width + padding * 2,
      height: bbox.height + padding * 2,
    };
    const oldSize = _.pick(this.state, ['width', 'height']);
    if (!_.isEqual(size, oldSize)) {
      this.setState(size);
    }
  }

  render() {
    const { _id, x, y, questColour, isSelected, completion } = this.props;
    const { width, height } = this.state;
    return (
      <g className={isSelected ? 'selected' : ''}
        transform={`translate(${x},${y})`} data-id={_id}
      >
        <rect
          x={-width / 2} y={-height / 2}
          width={width} height={height}
          fill={questColour}
          fillOpacity={completion === 'inactive' ? 0.2 : 1}
        />
        <Label text={_id} completion={completion} />
      </g>
    );
  }
}

Quest.propTypes = {
  _id: React.PropTypes.string.isRequired,
  x: React.PropTypes.number.isRequired,
  y: React.PropTypes.number.isRequired,
  questColour: React.PropTypes.string.isRequired,
  isSelected: React.PropTypes.bool,
  onClick: React.PropTypes.func.isRequired,
  completion: React.PropTypes.string.isRequired,
};

export default Quest;
