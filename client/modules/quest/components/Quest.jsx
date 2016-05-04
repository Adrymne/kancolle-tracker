import React from 'react';
import ReactDOM from 'react-dom';
import Label from './label';
import d3 from 'd3';

class Quest extends React.Component {
  componentDidMount() {
    const { _id, onClick } = this.props;
    d3.select(this.domNode()).on('click', onClick.bind(null, _id));
  }

  componentWillUnmount() {
    d3.select(this.domNode()).on('click', null);
  }

  domNode() {
    return ReactDOM.findDOMNode(this);
  }

  render() {
    const { _id, x, y, questColour, isSelected, completion, width, height } = this.props;
    return (
      <g className={`${isSelected ? 'selected' : ''} quest-node`}
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
  width: React.PropTypes.number.isRequired,
  height: React.PropTypes.number.isRequired,
  questColour: React.PropTypes.string.isRequired,
  isSelected: React.PropTypes.bool,
  onClick: React.PropTypes.func.isRequired,
  completion: React.PropTypes.string.isRequired,
};

export default Quest;
