import React from 'react';
import Autosuggest from 'react-autosuggest';

function getSuggestionValue({ value }) {
  return value;
}

function renderSuggestion({ text }) { // eslint-disable-line react/prop-types
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

  componentDidMount() {
    this.input.focus();
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
    const { cancelSearch } = this.props;
    const inputProps = {
      placeholder: '',
      value,
      onChange: this.onChange,
      onKeyDown: cancelSearch,
      className: 'form-control',
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
            theme={{
              container: {
                border: '1px solid rgb(1, 1, 1)',
                padding: '10px',
              },
            }}
            ref={(autosuggest) => {
              if (this.input || !autosuggest) {
                return;
              }
              this.input = autosuggest.input;
            }}
          />
        </foreignObject>
      </g>
    );
  }
}
SearchBox.propTypes = {
  items: React.PropTypes.array.isRequired,
  onItemSelected: React.PropTypes.func.isRequired,
  cancelSearch: React.PropTypes.func.isRequired,
};

export default SearchBox;
