import React, {useState, useContext} from 'react'
import RecipeCard from './RecipeCard'
import { handleSearches, handleFilterChange } from '../helpers';
import Search from './Search';
import Filter from './Filter';
import { Card } from 'semantic-ui-react'
import { UserContext } from '../context/UserContext';
import NewForm from './MainForm';


function Recipes({profileRecipes}) {
    const { recipes, properties, savedRecipes } = useContext(UserContext)
    const [searchResults, setSearchResults] = useState([]);
    const [filteredRecipes, setFilteredRecipes] = useState(profileRecipes === true ? savedRecipes : recipes);
    const [selectedProperties, setSelectedProperties] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    const displayedRecipes = searchTerm && searchResults.length > 0
        ? searchResults.map((recipe) => <RecipeCard recipe={recipe} />)
        : searchTerm && searchResults.length === 0
        ? <h3>No recipes match your search.</h3>
        : selectedProperties && filteredRecipes.length === 0
        ? <h3>No recipes match your filter.</h3>
        : filteredRecipes.map((recipe) => <RecipeCard recipe={recipe} />);
    
    const filterArray = profileRecipes === true
        ? savedRecipes
        : recipes

    return (
        <>
        <NewForm newHerb={false} />
        <Search 
            onSearch={(searchTerm) => handleSearches(searchTerm, filterArray, setSearchResults)} 
            searchedRecipes= {searchResults}
            searchTerm = {searchTerm}
            setSearchTerm = {setSearchTerm}
        />
        <Filter 
          onFilterChange={(selectedProperties) => handleFilterChange(selectedProperties, setSelectedProperties, filterArray, setFilteredRecipes)}
          selectedProperties={selectedProperties} 
          properties={properties}/>
          <br />
        <Card.Group itemsPerRow={4}>
            {displayedRecipes}
        </Card.Group>
        </>
    )
}

export default Recipes