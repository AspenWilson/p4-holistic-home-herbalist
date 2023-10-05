import React, {useState} from 'react'
import RecipeCard from './RecipeCard'

function Recipes({recipes, user}) {
    const [searchResults, setSearchResults] = useState([]);
    const [filteredRecipes, setFilteredRecipes] = useState(recipes);
    const [selectedProperties, setSelectedProperties] = useState([]);

    
    const allRecipes = recipes.map((recipe) => {
        return (
            <RecipeCard recipe={recipe}/>
        )
    })

    return (
        <div className='card-grid'>
            <h3>User = {user.username}</h3>
            {allRecipes}
        </div>
    )
}

export default Recipes