import React from 'react'
import { Tab } from 'semantic-ui-react'

// Fetch & Data Helpers

export function filterAlphabetically (data) {
    const sortedData = [...data]
    sortedData.sort((a,b) => a.name.localeCompare(b.name))
    return sortedData
}

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

export const headers = {
    "Accept": "application/json",
    "Content-Type": "application/json"
  }

// Search & Filter Helpers

export function handleSearches(searchTerm, searchTermSetter, arr, setter) {
    searchTermSetter(searchTerm)
    if (searchTerm.length === 0) {
        setter(arr)
    } else {
        const searchedItems = arr.filter((item) => item.name.toLowerCase().startsWith(searchTerm.toLowerCase()));
        
        const results = filterAlphabetically(searchedItems)
        setter(results)
    }

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

//Misc. General Helpers

export const tabPane = (arr, component, msg) => (
        <Tab.Pane attached={false}>
            {arr.length > 0 ? (
                <>
                {component}
                </>
            ) : (<h3>{msg}</h3>)}
        </Tab.Pane> 
    )

export const dosageTabs = (component) => (
    <Tab.Pane attached={false}>
        {component}
    </Tab.Pane>
)
