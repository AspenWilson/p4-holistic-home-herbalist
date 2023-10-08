import React, {useState, useEffect, useContext} from 'react'
import HerbCard from './HerbCard'
import {Grid, Card} from 'semantic-ui-react'
import "../index.css"
import Search from './Search'
import Filter from './Filter'
import { handleSearches, handleFilterChange } from '../helpers'
import { UserContext } from '../context/UserContext';
import ModalPopout from './ModalPopout'


function Herbs({profileHerbs}) {
    const { herbs, properties, savedHerbs, user, fetchUpdatedData} = useContext(UserContext)
    const [searchResults, setSearchResults] = useState([]);
    const [filteredHerbs, setFilteredHerbs] = useState(profileHerbs === true ? savedHerbs : herbs);
    const [selectedProperties, setSelectedProperties] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');


    const displayedHerbs = searchTerm && searchResults.length > 0
        ? searchResults.map((herb) => <HerbCard herb={herb} />)
        : searchTerm && searchResults.length === 0
        ? <h3>No herbs match your search.</h3>
        : selectedProperties && filteredHerbs.length === 0
        ? <h3>No herbs match your filter.</h3>
        : filteredHerbs.map((herb) => <HerbCard herb={herb} />);
    
    const filterArray = profileHerbs === true 
        ? savedHerbs
        : herbs

    return (
        <>
        <ModalPopout newHerb={true} msg='Add a new herb!' msg2='Add dosages to your herb'/>
        <Search 
            onSearch={(searchTerm) => handleSearches(searchTerm, filterArray, setSearchResults)} 
            searchedHerbs={searchResults}
            searchTerm = {searchTerm}
            setSearchTerm = {setSearchTerm}
        />
        <Filter 
          onFilterChange={(selectedProperties) => handleFilterChange(selectedProperties, setSelectedProperties, filterArray, setFilteredHerbs)}
          selectedProperties={selectedProperties} 
          properties={properties}/>
          <br />
        <Card.Group itemsPerRow={4}>
            {displayedHerbs}
        </Card.Group>
        </>
    )
}

export default Herbs