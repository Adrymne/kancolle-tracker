import React from 'react';
import Autosuggest from 'react-autosuggest';

const SEARCH_THEME = {
  input: 'form-control',
  suggestionsContainer: 'dropdown open full-width',
  suggestionsList: 'dropdown-menu',
  // suggestion: '',
  suggestionFocused: 'active',
};

class SearchInput extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: '',
      suggestions: [],
    };

    this.updateSuggestions = this.updateSuggestions.bind(this);
    this.selectItem = this.selectItem.bind(this);
  }

  updateSuggestions({ value: inputText }) {
    const { items } = this.props;
    this.setState({
      suggestions: items.filter(({ label }) =>
        label.toLowerCase().includes(inputText.toLowerCase())),
    });
  }

  selectItem(event, { suggestionValue }) {
    const { hide, onSelected } = this.props;
    onSelected(suggestionValue);
    hide();
  }

  render() {
    const { value, suggestions } = this.state;
    const inputProps = {
      autoFocus: true,
      value,
      onChange: (event, { newValue }) => this.setState({ value: newValue }),
    };
    return (
      <Autosuggest
        suggestions={suggestions}
        onSuggestionsFetchRequested={this.updateSuggestions}
        onSuggestionsClearRequested={() => this.setState({ suggestions: [] })}
        getSuggestionValue={({ value: val }) => val}
        renderSuggestion={({ label }) => (<a href="#">{label}</a>)}
        inputProps={inputProps}
        onSuggestionSelected={this.selectItem}
        theme={SEARCH_THEME}
      />
    );
  }
}
SearchInput.propTypes = {
  items: React.PropTypes.array,
  onSelected: React.PropTypes.func.isRequired,
  hide: React.PropTypes.func.isRequired,
};

export default SearchInput;
