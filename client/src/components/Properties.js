import React, { useContext, useState, useEffect } from 'react'
import PropertyCard from './PropertyCard'
import { AppContext } from '../context/AppContext';
import { Card, Button, Divider } from 'semantic-ui-react'
import Search from './Search';
import { handleSearches } from './helpers/GeneralHelpers';


function Properties() {
    const { properties } = useContext(AppContext)
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [selectedLetter, setSelectedLetter] = useState('');
    const [filteredProperties, setFilteredProperties] = useState([]);

    useEffect(() => {
        const filtered = properties.filter(property =>
            property.name.charAt(0).toUpperCase() === selectedLetter
        );
        setFilteredProperties(filtered);
    }, [selectedLetter])

    const uniqueFirstLetters = [...new Set(properties.map(property => property.name.charAt(0).toUpperCase()))];

    const letters = uniqueFirstLetters.map((letter) => {
        return (
            <Button circular style={{ backgroundColor: '#056d52', color:'white' }} key={ letter }
            className={ selectedLetter === letter ? 'active' : '' }
            onClick={() => setSelectedLetter(letter)}>
                <strong>{letter}</strong>
            </Button>
    )})

    const displayedProperties = 
        searchTerm && searchResults.length > 0
            ? searchResults.map((property) => <PropertyCard property={ property } key={ property.id } />)
        : searchTerm && searchResults.length === 0
            ? <h3>No properties match your search.</h3>
        : selectedLetter && filteredProperties.length > 0
            ? filteredProperties.map((property) => <PropertyCard property={ property } key={property.id} />)
        : selectedLetter && filteredProperties.length === 0
            ? <h3>No properties match your filters.</h3>
        : properties.map ((property) => <PropertyCard property={ property } key={ property.id }/>)

    return (
        <div>
            <h3>Search for properties by name...</h3>
            <Search 
            onSearch={(searchTerm) => handleSearches(searchTerm, setSearchTerm,properties, setSearchResults)}
            searchedProperties={ searchResults }
            searchTerm={ searchTerm }
            />
            <Divider />
            <h3> OR filter properties by first letter</h3>
            <Button circular style={{ backgroundColor: '#056d52', color:'white' }}
            className={selectedLetter === '' ? 'active' : ''}
            onClick={() => setSelectedLetter('')}>
                <strong>ALL</strong>
            </Button>
            {letters}
            <Divider />
            <Card.Group itemsPerRow={ 3 }>
                { displayedProperties }
            </Card.Group>
        </div>
    )
}

export default Properties