import React, { useState, useContext } from 'react'
import { Tab, Grid, Header } from 'semantic-ui-react'
import Recipes from './Recipes';
import Herbs from './Herbs';
import { AppContext } from '../context/AppContext';
import CommentCard from './CommentProfile';
import { tabPane } from './helpers/GeneralHelpers';
import "../index.css"




function Profile() {
    const { user, savedRecipes, savedHerbs, enteredHerbs, enteredRecipes, enteredComments } = useContext(AppContext)
    const [activeTab, setActiveTab] = useState('Saved Herbs')


    const panes = [
        { menuItem: 'Saved Herbs', render: () => tabPane(savedHerbs, <Herbs page='profile - saved' herbs={ savedHerbs }/>, 'No saved herbs.')},

        { menuItem: 'Saved Recipes', render: () => tabPane(savedRecipes, <Recipes page='profile - saved' recipes={ savedRecipes }/>, 'No saved recipes.')},

        { menuItem: 'Entered Herbs', render: () => tabPane(enteredHerbs, <Herbs herbs={ enteredHerbs } page='profile - entered'/>, 'No entered herbs.')},

        { menuItem: 'Entered Recipes', render: () => tabPane(enteredRecipes, <Recipes recipes={ enteredRecipes } page='profile - entered'/>, 'No entered recipes.')},

        { menuItem: 'Entered Comments', render: () => tabPane(enteredComments, <CommentCard comments={ enteredComments } />, 'You have not left any comments.')}
    ]

    return (
        <div className='profile'>
            <Grid>
                <Grid.Column width={ 2 }>
                    <div className='avatar-circle'>{ user.username[0].toUpperCase() }</div>
                </Grid.Column>

                <Grid.Column width={ 14 }>
                    <Header style={{ color: 'white' }}as='h1'>{ user.username }'s Profile</Header>
                    <p>Joined: { user.account_created_on }</p>
                </Grid.Column>
            </Grid>
            <br />
            <Tab 
                menu={{ fluid: true, tabular: true, pointing: true }}
                panes={ panes }
                activeIndex={ panes.findIndex((pane) => pane.menuItem === activeTab) }
                onTabChange={(_, data) => setActiveTab(data.panes[data.activeIndex].menuItem)} 
              />
        </div>
    )
}

export default Profile