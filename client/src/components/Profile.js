import React, {useState, useEffect} from 'react'
import { Tab, Grid, Header } from 'semantic-ui-react'
import "../index.css"
import Recipes from './Recipes';
import Herbs from './Herbs';


function Profile({user, savedHerbs, savedRecipes, herbs, recipes, properties}) {

    const [activeTab, setActiveTab] = useState('Saved Herbs')
    const [enteredHerbs, setEnteredHerbs] = useState([])
    const [enteredRecipes, setEnteredRecipes] = useState([])

    const filteredHerbs = () => {
        const herbsList = herbs.filter((herb) => herb.entered_by_id === user.id)
        setEnteredHerbs(herbsList)
    }

    const filteredRecipes = () => {
        const recipeList = recipes.filter((recipe) => recipe.entered_by_id === user.id)
        setEnteredRecipes(recipeList)
    }

    useEffect(() => {
        filteredHerbs()
        filteredRecipes()
    },[])

    const panes = [
        { 
            menuItem: 'Saved Herbs', 
            render: () => (
                <Tab.Pane>
                    {savedHerbs.length > 0 ? (
                        <Herbs herbs={savedHerbs} user={user} properties={properties}/>
                    ) : (
                        <h3>No saved herbs.</h3>
                    )}
                    <div>Content for Saved Herbs</div>
                </Tab.Pane> )},
        { 
            menuItem: 'Saved Recipes', 
            render: () => (
                <Tab.Pane>
                    {savedRecipes.length > 0 ? (
                        <Recipes recipes={savedRecipes} user={user} />
                    ) : (
                        <h3>No saved recipes.</h3>
                    )}
                    <div>Content for Saved Recipes</div>
                </Tab.Pane> )},
        { 
            menuItem: 'Entered Herbs', 
            render: () => (
                <Tab.Pane>
                    {enteredHerbs.length > 0 ? (
                        <Herbs herbs={enteredHerbs} user={user} properties={properties}/>
                    ) : (
                        <h3>No entered herbs.</h3>
                    )}
                    <div>Content for entered herbs</div>
                </Tab.Pane> )},
        { 
            menuItem: 'Entered Recipes', 
            render: () => (
                <Tab.Pane>
                    {enteredRecipes.length > 0 ? (
                        <Recipes recipes={enteredRecipes} user={user}/>
                    ) : (
                        <h3>No entered recipes.</h3>
                    )}
                    <div>Content for entered recipes</div>
                </Tab.Pane> )},
    ]

    return (
        <>
        <div>
            <h1>Profile</h1>
            <h3>User = {user.username}</h3>
        </div>
        <div className='profile'>
            <Grid>
                <Grid.Column width={4}>
                    <div className='avatar-circle'>
                        {user.username[0]}
                    </div>
                </Grid.Column>
                <Grid.Column width={12}>
                    <Header as='h1'>{user.username}'s Profile</Header>
                    <p>Joined: {user.account_created_on}</p>
                </Grid.Column>
            </Grid>

            <Tab 
                menu={{ fluid: true, vertical: true, tabular: true }}
                panes={panes}
                activeIndex={panes.findIndex((pane) => pane.menuItem === activeTab)}
                onTabChange={(_, data) => setActiveTab(data.panes[data.activeIndex].menuItem)}
              />
        </div>
        </>
    )

}

export default Profile