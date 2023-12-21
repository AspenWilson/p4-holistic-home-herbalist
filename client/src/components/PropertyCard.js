import React, { useContext } from "react";
import { Link } from 'react-router-dom';
import { Card, Tab, List } from 'semantic-ui-react';
import { AppContext } from "../context/AppContext";
import { CardHeader } from "./helpers/StylingHelpers";


function PropertyCard({ property }){
    const { herbs, recipes } = useContext(AppContext)
    
    const propertyHerbs = herbs.filter((herb) => {
        return herb.properties.some((prop) => prop.id === property.id)})
        
    const propertyRecipes = recipes.filter((recipe) => {
        return recipe.properties.some((prop) => prop.id === property.id)
    })
        
    const propertyHerbList = propertyHerbs.length > 0 ? (
        propertyHerbs.map((herb) => {
            return (
                <List.Item><Link to={`/herbs/${herb.id}`} style={{ color: 'white' }}>- { herb.name }</Link></List.Item> 
            )
        })) : ( <h4>No herbs are associated with this property.</h4> )
                
    const propertyRecipeList = propertyRecipes.length > 0 ? (
        propertyRecipes.map((recipe) => {
            return (
                <List.Item><Link to={`/recipes/${recipe.id}`} style={{ color: 'white' }}>- { recipe.name }</Link></List.Item>
            )
        })) : ( <h4>No recipes are associated with this property.</h4> )

    const panes = [
        { menuItem: 'Description', render: () => <Tab.Pane>{ property.description }</Tab.Pane>},
        { menuItem: 'Herbs', render: () =>
            (<Tab.Pane>
                <List link>
                    { propertyHerbList }
                </List>
            </Tab.Pane>)
        },
        { menuItem: 'Recipes', render: () => 
            (<Tab.Pane>
                <List link>
                    { propertyRecipeList }
                </List>
            </Tab.Pane>)
        }
    ]
    
    return (
        <Card raised key={ property.id }>
            <CardHeader as='h1'>{ property.name }</CardHeader>
            <Card.Content >
                <Tab panes={ panes } />
            </Card.Content>
        </Card>
    )
}

export default PropertyCard