import React from 'react';
import ReactDOM from 'react-dom';
import Label from './label';
import _ from 'lodash';

class Quest extends React.Component {
  constructor(props) {
    super(props);
    this.state = { width: 0, height: 0, padding: 10 };
  }

  componentDidMount() {
    this.updateDimensions();
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
    const { _id, x, y } = this.props;
    const { width, height } = this.state;
    return (
      <g transform={`translate(${x},${y})`} data-id={_id}>
        <rect
          x={-width / 2} y={-height / 2}
          width={width} height={height}
          stroke="#000" fill="#fff"
        />
        <Label text={_id} />
      </g>
    );
  }
}

Quest.propTypes = {
  _id: React.PropTypes.string.isRequired,
  x: React.PropTypes.number.isRequired,
  y: React.PropTypes.number.isRequired,
};

export default Quest;
