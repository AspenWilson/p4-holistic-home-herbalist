import React from 'react';
import { Input, Icon } from 'semantic-ui-react'


function Search({ onSearch, searchTerm, setSearchTerm }) {

  const handleInputChange = (e) => {
    const userInput = e.target.value
    setSearchTerm(userInput);
    onSearch(userInput)
  };

  const handleClear = () => {
    setSearchTerm('');
  };

  return (
    <div className="search">
      <Input
        icon={<Icon name= 'remove circle' circular onClick={handleClear()} />}
        fluid
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={handleInputChange}
      />
    </div>
  );
}

export default Search;