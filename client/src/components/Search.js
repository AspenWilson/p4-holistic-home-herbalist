import React from 'react';
import { Input } from 'semantic-ui-react';


function Search({ onSearch, searchTerm }) {

  return (
    <div className="search">
      <Input
        fluid
        type="text"
        placeholder="Search..."
        value={ searchTerm }
        onChange={(e) => onSearch(e.target.value)}
      />
    </div>
  );
}

export default Search;