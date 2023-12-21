import React from 'react';
import { Dropdown } from 'semantic-ui-react';

function Filter({ properties, selectedProperties, onFilterChange }) {

    return (
      <Dropdown
        placeholder="Select properties"
        fluid
        multiple
        search
        selection
        options={properties.map((property) => ({
          key: property.name,
          text: property.name,
          value: property.name,
        }))}
        value={selectedProperties}
        onChange={(_, { value }) => onFilterChange(value)}
      />
    );
  }
  
  export default Filter;