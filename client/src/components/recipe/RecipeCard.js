import React, { useContext, useState } from "react";
import { Link } from 'react-router-dom';
import { Card, Label, Button } from 'semantic-ui-react';
import { AppContext } from '../../context/AppContext';
import ModalPopout from "../modals/ModalPopout";
import DeleteModal from "../modals/DeleteModal";
import { headers } from "../helpers/GeneralHelpers";
import { propertyTags } from "../helpers/CardHelpers";


function RecipeCard({ recipe, page }){
    const { savedRecipes, user, refreshSavedRecipes, refreshEnteredRecipes, refreshRecipes, handleModalSuccess } = useContext(AppContext)
    const [isSaved, setIsSaved] = useState(savedRecipes.some((savedRecipe) => savedRecipe.id === recipe.id))

    const toggleSavedStatus = () => {
        const method = isSaved ? 'DELETE' : 'POST';
        fetch(`/api/users/${user.id}/saved-recipes${isSaved ? `/${recipe.id}` : ''}`, {
          method,
          headers,
          body: !isSaved ? JSON.stringify({ recipe_id: recipe.id }) : undefined,
        }).then((resp) => {
          if (resp.ok) {
            setIsSaved(!isSaved);
            refreshSavedRecipes(user);
          }
        });
      };

    const handleDelete = () => {
        fetch(`/api/recipes/${recipe.id}`, {
            method:'DELETE',
            headers
        }).then((resp) => {
            if (resp.ok) {
                handleModalSuccess()
                refreshEnteredRecipes(user)
                refreshRecipes()
            }})
    }

    return (
        <Card raised>
            <Card.Content>
            <Button 
                icon={isSaved? 'star' : 'star outline'} 
                circular 
                style={{ color: "#056d52" }} 
                floated='right' 
                onClick={ toggleSavedStatus }
            /> 
            <br />
            <br />
            { page === 'profile - entered' ?                     
                <div >
                    <Button.Group vertical floated='right' >
                        <ModalPopout modalType='recipe edits' msg='Edit Recipe' id={recipe.id}/> 
                        <DeleteModal handleDelete={ handleDelete } />             
                    </Button.Group>
                </div>
            : null }
            <Card.Header>{recipe.name}</Card.Header>
            <Card.Description >
                <h3>Properties</h3>
                <Label.Group tag>
                    {recipe.properties.length > 0 ? propertyTags(recipe.properties) : (null)}
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