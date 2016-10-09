import React from 'react';
import Autosuggest from 'react-autosuggest';

// based on http://codepen.io/moroshko/pen/LGNJMy
const SEARCH_THEME = {
  input: {
    width: '100%',
    height: '34px',
    padding: '10px 20px',
    border: '1px solid #aaa',
    borderRadius: '4px',
  },
  inputFocus: {
    outline: 'none',
  },
  containerOpen: {
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  suggestionsContainer: {
    top: '51px',
    width: '100%',
    margin: 0,
    padding: 0,
    listStyleType: 'none',
    border: '1px solid #aaa',
    backgroundColor: '#fff',
    borderBottomLeftRadius: '4px',
    borderBottomRightRadius: '4px',
    zIndex: 2,
  },
  suggestion: {
    cursor: 'pointer',
    padding: '10px 20px',
  },
  suggestionFocused: {
    backgroundColor: '#ddd',
  },
};

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

  onChange(event, { newValue, method }) {
    if (method === 'type') {
      this.setState({ value: newValue });
    }
  }

  onSuggestionSelected(event, { suggestion: { value: id } }) {
    const { onItemSelected } = this.props;
    onItemSelected(id);
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
    };
    return (
      <g
        style={{ background: 'rgb(0,0,0)' }}
      >
        <foreignObject
          style={{ width: '80%', height: '20%', x: '10%', y: '20%' }}
        >
          <Autosuggest
            suggestions={suggestions}
            onSuggestionsUpdateRequested={this.updateSuggestions}
            getSuggestionValue={getSuggestionValue}
            renderSuggestion={renderSuggestion}
            inputProps={inputProps}
            onSuggestionSelected={this.onSuggestionSelected}
            theme={SEARCH_THEME}
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
