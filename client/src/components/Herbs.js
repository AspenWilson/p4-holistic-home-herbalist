import React, {useState} from 'react'
import HerbCard from './HerbCard'
import {Grid, Card} from 'semantic-ui-react'
import "../index.css"
import Search from './Search'
import Filter from './Filter'
import { handleSearches } from '../helpers'

function Herbs({herbs, properties}) {
    const [searchResults, setSearchResults] = useState([]);
    const [filteredHerbs, setFilteredHerbs] = useState(herbs);
    const [selectedProperties, setSelectedProperties] = useState([]);
  
    // const handleSearchHerbs = (searchTerm) => {
    //   console.log(searchTerm)
    //   const searchedHerbs = herbs.filter((herb) => 
    //     herb.name.toLowerCase().startsWith(searchTerm.toLowerCase())
    //   )
    //   setSearchResults(searchedHerbs)
    //   console.log(searchResults)
    // };

    const allHerbs = herbs.map((herb) => {
        return (
            <HerbCard herb={herb} key={herb.id}/>
        )
    })

    const handleFilterChange = (selectedProps) => {
        setSelectedProperties(selectedProps); // Update selected properties state
        if (selectedProps.length === 0) {
          setFilteredHerbs(herbs);
        } else {
          const filtered = herbs.filter((herb) =>
            selectedProps.every((prop) =>
              herb.properties.some((herbProp) => herbProp.name === prop)
            )
          );
          setFilteredHerbs(filtered);
          console.log(selectedProperties)
          console.log(filteredHerbs)
        }
      };

    // const searchResutsList = searchResults.map((herb) => {
    //     return (
    //         <HerbCard herb={herb} hey = {herb.id} />
    //     )
    // })

    return (
        <>
        <Search 
            onSearch={handleSearches(searchTerm, herbs, setSearchResults)} 
            searchedHerbs={searchResults}
        />
        <Filter 
          onFilterChange={handleFilterChange}
          selectedProperties={selectedProperties} 
          properties={properties}/>
          <br />
        <Card.Group itemsPerRow={4}>
            {allHerbs}
        </Card.Group>
        </>
    )
}

export default Herbs