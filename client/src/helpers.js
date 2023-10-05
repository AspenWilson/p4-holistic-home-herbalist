import React from 'react';
import {Label} from 'semantic-ui-react'

export const headers = {
    "Accept": "application/json",
    "Content-Type": "application/json"
}

export const propertyTags = (arr) => {
    return arr.properties.map((property) => (
      <Label color='red' tag key={property.id}>
        {property.name}
      </Label>
    ));
};

export const url = `http://localhost:5555`

export function basicFetch(url, tag, setter){
    fetch(url + tag)
    .then((resp) => resp.json())
    .then(setter)
}

export function handleSearches(term, arr, setter) {
    console.log(term)
    const searchedItems = arr.filter((item) => item.name.toLowerCase().startsWith(term.toLowerCase()));
    setter(searchedItems)
    console.log(searchedItems)
}

