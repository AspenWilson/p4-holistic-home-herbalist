import React from 'react';
import { UserContext } from '../context/UserContext';


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
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={handleInputChange}
      />
      <button onClick={handleClear}>Clear</button>
    </div>
  );
}

export default Search;