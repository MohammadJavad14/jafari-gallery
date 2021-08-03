import React from 'react';
import SearchBox from '../components/SearchBox';
import { Route } from 'react-router-dom';

const SearchScreen = () => {
  return (
    <div>
      <Route render={({ history }) => <SearchBox history={history} />} />
    </div>
  );
};

export default SearchScreen;
