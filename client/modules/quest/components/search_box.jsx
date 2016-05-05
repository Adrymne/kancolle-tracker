import React from 'react';
import Autosuggest from 'react-autosuggest';

function getSuggestionValue({ value }) {
  return value;
}

function renderSuggestion({ text }) {
  return <span>{text}</span>;
}

class SearchBox extends React.Component {
  constructor() {
    super();

    this.state = {
      value: '',
      suggestions: [],
    };

    this.onChange = this.onChange.bind(this);
    this.updateSuggestions = this.updateSuggestions.bind(this);
    this.onSuggestionSelected = this.onSuggestionSelected.bind(this);
  }

  onChange(event, { newValue }) {
    this.setState({ value: newValue });
  }

  onSuggestionSelected(event, { suggestionValue }) {
    const { onItemSelected } = this.props;
    onItemSelected(suggestionValue);
  }

  getSuggestions(value) {
    const { items } = this.props;
    return items.filter(({ text }) =>
      text.toLowerCase().includes(value.toLowerCase())
    );
  }

  updateSuggestions({ value }) {
    this.setState({
      suggestions: this.getSuggestions(value),
    });
  }

  render() {
    const { value, suggestions } = this.state;
    const inputProps = {
      placeholder: '',
      value,
      onChange: this.onChange,
    };
    return (
      <g
        style={{ background: 'rgb(0,0,0' }}
      >
        <foreignObject
          style={{ width: '80%', height: '20%', x: '10%', y: '40%' }}
        >
          <Autosuggest
            suggestions={suggestions}
            onSuggestionsUpdateRequested={this.updateSuggestions}
            getSuggestionValue={getSuggestionValue}
            renderSuggestion={renderSuggestion}
            inputProps={inputProps}
            onSuggestionSelected={this.onSuggestionSelected}
          />
        </foreignObject>
      </g>
    );
  }
}
SearchBox.propTypes = {
  items: React.PropTypes.array.isRequired,
  onItemSelected: React.PropTypes.func.isRequired,
};

export default SearchBox;
