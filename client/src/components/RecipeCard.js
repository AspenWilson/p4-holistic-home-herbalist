import React, {useContext, useState } from "react";
import { Card, Label, Button } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { propertyTags, headers } from "../helpers";
import { UserContext } from '../context/AppContext';
import ModalPopout from "./ModalPopout";


function RecipeCard({ recipe, page }){
    const { savedRecipes, user, refreshSavedRecipes, refreshEnteredRecipes, refreshRecipes } = useContext(UserContext)
    const [isSaved, setIsSaved] = useState(savedRecipes.some((savedRecipe) => savedRecipe.id === recipe.id))

    const handleSave = () => {
        fetch(`/api/users/${user.id}/saved-recipes`, {
            method: 'POST',
            headers,
            body: JSON.stringify({recipe_id: recipe.id})
        })
        .then((resp) => {
            if (resp.ok) {
                setIsSaved(!isSaved)
                refreshSavedRecipes(user)
            }
        })
    }

    const handleUnSave = () => {
        fetch (`/api/users/${user.id}/saved-recipes/${recipe.id}`, {
            method:'DELETE',
            headers
        })
        .then((resp) => {
            if(resp.ok) {
            setIsSaved(!isSaved)
            refreshSavedRecipes(user)
            }
        })
    }

    const handleDelete = () => {
        fetch(`/api/recipes/${recipe.id}`, {
            method:'DELETE',
            headers
        })
        .then((resp) => {
            if (resp.ok) {
                refreshEnteredRecipes(user)
                refreshRecipes()
            }})
    }

    return (
        <Card raised>
            <Card.Content>
            {isSaved ? 
                <Button icon='star' floated='right' circular style={{ color: "#056d52" }} onClick={handleUnSave}/> :
                <Button icon='star outline' circular floated='right' style={{color: "#056d52"}} onClick={handleSave}/>
            }
                <br />
                <br />
                { page === 'profile - entered' ?                     
                    <div >
                        <Button.Group vertical floated='right' >
                            <ModalPopout modalType='recipe edits' msg='Edit Recipe' id={recipe.id}/> 
                            <Button circular  icon="trash" color='red' onClick={handleDelete}/>             
                        </Button.Group>
                    </div>
                : null }
                <Card.Header>{recipe.name}</Card.Header>
                <Card.Description >
                    <h3>Properties</h3>
                    <Label.Group tag>
                        {recipe.properties.length > 0 ? (
                            propertyTags(recipe.properties) 
                        ) : (null)}
                    </Label.Group>
                </Card.Description>
            </Card.Content>
                <Button color='black'>
                    <Link to={`/recipes/${recipe.id}`} style={{color: 'white'}}>View Details</Link> 
                </Button>
        </Card>
    )
}

export default RecipeCard