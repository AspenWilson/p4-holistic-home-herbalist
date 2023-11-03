import React, { useState, useContext, useEffect } from 'react'
import { Card, Grid, Divider } from 'semantic-ui-react'
import { useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext';
import { handleSearches, handleFilterChange } from './helpers/GeneralHelpers'
import HerbCard from './HerbCard'
import Search from './Search'
import Filter from './Filter'
import ModalPopout from './ModalPopout'
import "../index.css"

function Herbs({ page }) {
    const { id } = useParams()
    const { properties, herbs, savedHerbs, enteredHerbs } = useContext(AppContext)

    const [searchResults, setSearchResults] = useState([]);
    const [filteredHerbs, setFilteredHerbs] = useState([])
    const [selectedProperties, setSelectedProperties] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [propertyHerbs, setPropertyHerbs] = useState([])

    useEffect(() => {
        const list = herbs.filter((herb) => herb.properties.some((property) => property.id === id))
        setPropertyHerbs(list)
    }, [id])
    
    const herbsList = 
        page === 'home' ? herbs :
        page === 'profile - saved' ? savedHerbs :
        page === 'profile - entered' ? enteredHerbs :
        page === 'properties' ? propertyHerbs :
        null

    const displayedHerbs = 
        searchTerm && searchResults.length > 0 ? searchResults.map((herb) => <HerbCard key={herb.id} herb={herb} page={page}/>) :
        searchTerm && searchResults.length === 0 ? <h3>No herbs match your search.</h3> :
        selectedProperties.length > 0 && filteredHerbs.length > 0 ? filteredHerbs.map((herb) => <HerbCard key={herb.id} herb={herb} page={page}/>) :
        selectedProperties.length > 0 && filteredHerbs.length === 0 ? <h3>No herbs match your filter.</h3> : 
        id && propertyHerbs.length > 0 ? propertyHerbs.map((herb) => <HerbCard key={herb.id} herb={herb} />) :
        id && propertyHerbs.length === 0 ? <h3>No herbs have this property.</h3> :
        herbsList.map((herb) => <HerbCard key={herb.id} herb={herb} page={page}/>);

    return (
        <div>
            <ModalPopout modalType='new herb' msg='Add a new herb' />
            <Divider />
            <Grid columns={ 2 }>
                <Grid.Column>
                    <h3>Search for herbs by name...</h3>
                    <Search 
                        onSearch={(searchTerm) => handleSearches(searchTerm, setSearchTerm, herbsList, setSearchResults)} 
                        searchedHerbs={ searchResults }
                        searchTerm = { searchTerm }
                    />
                </Grid.Column>

                <Grid.Column>
                    <h3> OR filter herbs by their properties</h3>
                    <Filter 
                        onFilterChange={(selectedProperties) => handleFilterChange(selectedProperties, setSelectedProperties, herbsList, setFilteredHerbs)}
                        selectedProperties={ selectedProperties } 
                        properties={ properties }
                    />
                </Grid.Column>
            </Grid>
            <br />
            <Card.Group itemsPerRow={ 4 } >
                { displayedHerbs }
            </Card.Group>
        </div>
    )
}

export default Herbs

