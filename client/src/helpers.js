import React from 'react';
import {Label, Popup } from 'semantic-ui-react'

// Property tags for recipe and herb cards

export function filterAlphabetically (data) {
    const sortedData = [...data]
    sortedData.sort((a,b) => a.name.localeCompare(b.name))
    return sortedData
}
export const propertyTags = (arr) => {
    const filteredArr = filterAlphabetically(arr)
    return filteredArr.map((property) => (
        <Popup content={property.description} trigger={
            <Label style={{backgroundColor: '#056d52', color:'white'}} tag key={property.id}>
                {property.name}
            </Label>}
        />
    ));
};
export const headers = {
    "Accept": "application/json",
    "Content-Type": "application/json"
  }

// Functions for data fetching, searches, and filters

export function basicFetch(tag, setter, filteredFunction = null){
    fetch(tag)
    .then((resp) => {
        if (resp.ok) {
            resp.json().then(data => {
                const sortedItems = filteredFunction ? filteredFunction(data) : data
                setter(sortedItems)
            })
        }})
}



export function handleSearches(searchTerm, arr, setter) {
    const searchedItems = arr.filter((item) => item.name.toLowerCase().startsWith(searchTerm.toLowerCase()));
    const results = filterAlphabetically(searchedItems)
    setter(results)
}

export function handleFilterChange (selectedProperties, propertySetter, arr, searchSetter) {
    propertySetter(selectedProperties)
    if (selectedProperties.length === 0) {
        searchSetter(arr);
    } else {
        const filtered = arr.filter((item) => selectedProperties.every((property) =>
            item.properties.some((itemProp) => itemProp.name === property)
        )
        );
        searchSetter(filtered)
    }
}





