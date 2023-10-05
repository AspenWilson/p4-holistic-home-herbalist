import React from "react";
import { Card, Label, Button } from 'semantic-ui-react'
import {Link} from 'react-router-dom'
import { propertyTags } from "../helpers";

function RecipeCard({recipe}){


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
                </Card.Content>
            </Card>
        </div>
    )
}

export default RecipeCard