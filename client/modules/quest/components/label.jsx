import React from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';

class Label extends React.Component {
  constructor(props) {
    super(props);
    this.state = { width: 0, height: 0 };
  }

  componentDidMount() {
    this.updateDimensions();
  }

  componentDidUpdate({ prevText }) {
    const { text } = this.props;
    if (prevText && text && text !== prevText) {
      this.updateDimensions();
    }
  }

  updateDimensions() {
    const node = ReactDOM.findDOMNode(this);
    this.setState(_.pick(node.getBBox(), ['width', 'height']));
  }

  render() {
    const { text, completion } = this.props;
    const { width, height } = this.state;
    return (
      <g transform={`translate(${-width / 2},${-height / 2})`}>
        <text fillOpacity={completion === 'complete' ? 1e-9 : 1}>
          <tspan space="preserve" dy="1em" x={1}>
            {text}
          </tspan>
        </text>
      </g>
    );
  }
}
Label.propTypes = {
  text: React.PropTypes.string,
  completion: React.PropTypes.string,
};

export default Label;
