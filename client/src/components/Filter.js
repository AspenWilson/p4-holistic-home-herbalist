import React from 'react'
import { Dropdown } from 'semantic-ui-react'
import { UserContext } from '../context/UserContext';

function Filter({ properties, selectedProperties, onFilterChange }) {
    const options = properties.map((property) => ({
      key: property.name,
      text: property.name,
      value: property.name,
    }));
  
    const handleFilterChange = (_, { value }) => {
      onFilterChange(value);
    };
  
    return (
      <Dropdown
        placeholder="Select properties"
        fluid
        multiple
        search
        selection
        options={options}
        value={selectedProperties}
        onChange={handleFilterChange}
      />
    );
  }
  
  export default Filter;