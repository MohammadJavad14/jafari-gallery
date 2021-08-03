import React, { useState } from 'react';

import classes from './SearchBox.module.css';

const SearchBox = ({ history }) => {
  const [keyword, setKeyword] = useState('');

  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      history.push(`/search/${keyword}`);
    } else {
      history.push('/');
    }
  };
  return (
    <form className={classes['header-search-form']} onSubmit={submitHandler}>
      <input
        type='text'
        placeholder='جستجو در محصولات'
        className={classes['main-search-box']}
        onChange={(e) => setKeyword(e.target.value)}
      />
      <button>
        <i className={`${classes['search-icon']} fas fa-search`}></i>
      </button>
    </form>
  );
};

export default SearchBox;
