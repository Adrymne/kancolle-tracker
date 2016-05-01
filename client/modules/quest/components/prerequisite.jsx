import React from 'react';

class Prerequisite extends React.Component {
  constructor() {
    super();
    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    const { onClick, _id } = this.props;
    onClick(_id);
  }

  render() {
    const { _id, description, colour } = this.props;
    return (
      <li
        className="quest-prereq"
        onClick={this.onClick}
        style={{
          pointerEvents: 'auto',
          background: colour,
          border: '1px solid rgb(0, 0, 0)',
          padding: '1px 3px 1px 3px',
          margin: '1px',
          cursor: 'pointer',
        }}
      >
        {`[${_id}] ${description}`}
      </li>
    );
  }
}
Prerequisite.propTypes = {
  onClick: React.PropTypes.func.isRequired,
  _id: React.PropTypes.string.isRequired,
  description: React.PropTypes.string.isRequired,
  colour: React.PropTypes.string.isRequired,
};

export default Prerequisite;
