import React, {useContext, useState, useEffect } from "react";
import { Card, Label, Button } from 'semantic-ui-react'
import {Link} from 'react-router-dom'
import { propertyTags } from "../helpers";
import { UserContext } from '../context/UserContext';


function RecipeCard({recipe}){
    const { savedRecipes, user, fetchUpdatedData} = useContext(UserContext)
    const [isSaved, setIsSaved] = useState(savedRecipes.some((savedRecipe) => savedRecipe.id === recipe.id))

    useEffect(() => {
        fetchUpdatedData()
        console.log('useEffect from RecipeCard')
    },[])

    const handleSave = () => {
        fetch(`/api/users/${user.id}/saved-recipes`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify({recipe_id: recipe.id})
        })
        .then((resp) => {
            if (resp.ok) {
                setIsSaved(!isSaved)
                fetchUpdatedData()
                
            }
        })
        .catch((error) => {
            console.error('Error:', error)
        })
    }

    const handleUnSave = () => {
        fetch (`/api/users/${user.id}/saved-recipes/${recipe.id}`, {
            method:'DELETE'
        })
        .then((resp) => {
            setIsSaved(!isSaved)
            fetchUpdatedData()
        })
        .catch((error) => {
            console.error('Error: ', error)
        })
    }


    return (
        <div key={recipe.id}>
            <Card raised>
                <Card.Content>
                    <Card.Header>{recipe.name}</Card.Header>
                    <Card.Description >
                        <h3>Properties</h3>
                        <Label.Group tag>
                            {recipe.properties.length > 0 ? (
                            propertyTags(recipe) 
                            ) : (null)}
                        </Label.Group>
                    </Card.Description>
                </Card.Content>
                <Card.Content extra>
                        <Button basic color='green'>
                        <Link to={`/recipes/${recipe.id}`}>View Details</Link> 
                    </Button>
                    {isSaved ? 
                        <Button basic color='orange' onClick={handleUnSave}>Saved</Button> :
                        <Button basic color='yellow' onClick={handleSave}>Save</Button>
                    }
                </Card.Content>
            </Card>
        </div>
    )
}

export default RecipeCard