import React, { useState, useContext } from 'react'
import RecipeCard from './RecipeCard'
import { handleSearches, handleFilterChange } from './helpers/GeneralHelpers';
import Search from './Search';
import Filter from './Filter';
import { Card, Grid, Divider } from 'semantic-ui-react'
import { AppContext } from '../context/AppContext';
import ModalPopout from './ModalPopout';


function Recipes({ page }) {
    const { recipes, properties, savedRecipes, enteredRecipes } = useContext(AppContext)
    const [searchResults, setSearchResults] = useState([]);
    const [filteredRecipes, setFilteredRecipes] = useState([]);
    const [selectedProperties, setSelectedProperties] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    const recipesList = 
        page === 'home' ? recipes :
        page === 'profile - saved' ? savedRecipes :
        page === 'profile - entered' ? enteredRecipes :
        null

    const displayedRecipes = 
        searchTerm && searchResults.length > 0 ? searchResults.map((recipe) => <RecipeCard id={recipe.id} recipe={recipe} page={page}/>) :
        searchTerm && searchResults.length === 0 ? <h3>No recipes match your search.</h3> :
        selectedProperties.length > 0 && filteredRecipes.length > 0 ? filteredRecipes.map((recipe) => <RecipeCard id={recipe.id} recipe={recipe} page={page} />) :
        selectedProperties.length > 0 && filteredRecipes.length === 0 ? <h3>No recipes match your filter.</h3> :
        recipesList.map((recipe) => <RecipeCard id={recipe.id} recipe={recipe} page={page}/>);

    return (
        <div>
            <ModalPopout modalType='new recipe' msg='Add a new recipe'/>
            <Divider />
            <Grid columns={ 2 }>
                <Grid.Column>
                <h3>Search for recipes by name...</h3>
                    <Search 
                        onSearch={(searchTerm) => handleSearches(searchTerm, setSearchTerm, recipesList, setSearchResults)} 
                        searchedRecipes= { searchResults }
                        searchTerm = { searchTerm }
                    />
                </Grid.Column>

                <Grid.Column>
                <h3> OR filter recipes by their properties</h3>
                <Filter 
                    onFilterChange={(selectedProperties) => handleFilterChange(selectedProperties, setSelectedProperties, recipesList, setFilteredRecipes)}
                    selectedProperties={ selectedProperties } 
                    properties={ properties }
                />
                </Grid.Column>
            </Grid>
            <br />
            <Card.Group itemsPerRow={ 4 }>
                { displayedRecipes }
            </Card.Group>
        </div>
    )
}

export default Recipes