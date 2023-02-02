import React from 'react';
import css from './Searchbar.module.css';
import { ImSearch } from 'react-icons/im';

class Searchbar extends React.Component {
  state = {
    searchText: '',
  };

  handleNameChange = event => {
    this.setState({ searchText: event.currentTarget.value.toLowerCase() });
  };

  handleSubmit = event => {
    event.preventDefault();

    if (this.state.searchText.trim() === '') {
      console.log('Введіть щось в поле пошуку');
      return;
    }

    this.props.onSubmit(this.state.searchText);
    this.setState({ searchText: '' });
  };
  render() {
    return (
      <header className={css.searchbar}>
        <form className={css.searchForm} onSubmit={this.handleSubmit}>
          <button type="submit" className={css.searchFormButton}>
            <ImSearch className={css.searchImg} />
          </button>

          <input
            className={css.searchFormInput}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={this.state.searchText}
            onChange={this.handleNameChange}
          />
        </form>
      </header>
    );
  }
}

export default Searchbar;
