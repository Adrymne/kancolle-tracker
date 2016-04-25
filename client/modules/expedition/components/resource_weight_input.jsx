import React from 'react';

class ResourceWeightInput extends React.Component {
  constructor() {
    super();
    this.setWeight = this.setWeight.bind(this);
  }

  setWeight(event) {
    const { resource, setResourceWeight } = this.props;
    setResourceWeight(resource, event.target.value);
  }

  render() {
    const { resource, size, resourceWeights } = this.props;
    return (
      <div className={`form-group ${size}`}>
        <label style={{ marginRight: '4px' }}>{`${resource}:`}</label>
        <input type="text"
          value={resourceWeights[resource]}
          onChange={this.setWeight}
          style={{ textAlign: 'center' }}
        />
      </div>
    );
  }
}
ResourceWeightInput.propTypes = {
  resource: React.PropTypes.string.isRequired,
  setResourceWeight: React.PropTypes.func.isRequired,
  size: React.PropTypes.string.isRequired,
  resourceWeights: React.PropTypes.object.isRequired,
};

export default ResourceWeightInput;
