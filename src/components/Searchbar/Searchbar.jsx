/* eslint-disable no-undef */
import { useState } from 'react';
import css from './Searchbar.module.css';
import { ImSearch } from 'react-icons/im';

import PropTypes from 'prop-types';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Searchbar({ onSubmit }) {
  const [searchText, setSearchText] = useState('');

  const handleNameChange = event => {
    setSearchText(event.currentTarget.value.toLowerCase());
  };

  const handleSubmit = event => {
    event.preventDefault();

    if (searchText.trim() === '') {
      return toast.warn('Type something in the search box');
    }
    onSubmit(searchText);
  };

  return (
    <header className={css.searchbar}>
      <form className={css.searchForm} onSubmit={handleSubmit}>
        <button type="submit" className={css.searchFormButton}>
          <ImSearch className={css.searchImg} />
        </button>

        <input
          className={css.searchFormInput}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={searchText}
          onChange={handleNameChange}
        />
      </form>
      <ToastContainer position="top-center" autoClose={2500} theme="colored" />
    </header>
  );
}

PropTypes.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
