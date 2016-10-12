import React from 'react';
import { HotKeys } from 'react-hotkeys';
import { Modal } from 'react-bootstrap';
import SearchInput from '../containers/search_input';

class Search extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      mode: null,
    };

    this.hide = this.hide.bind(this);
  }

  hide() {
    this.setState({ mode: null });
  }

  render() {
    const { searchItems } = this.props;
    const { mode } = this.state;
    return (
      <HotKeys focused attach={window} handlers={{
        searchByDescription: () => { this.setState({ mode: 'description' }); return false; },
        searchByRewards: () => { this.setState({ mode: 'rewards' }); return false; },
      }}
      >
      <Modal show={!! mode} onHide={this.hide}>
        <Modal.Body>
          <SearchInput searchItems={searchItems} mode={mode} hide={this.hide} />
        </Modal.Body>
      </Modal>
      </HotKeys>
    );
  }
}
Search.propTypes = {
  searchItems: React.PropTypes.object.isRequired,
};

export default Search;
