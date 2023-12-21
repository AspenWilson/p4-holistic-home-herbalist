import React, { useState, useContext } from 'react';
import { Tab, Grid, Header, Image } from 'semantic-ui-react';
import { AppContext } from '../../context/AppContext';
import "../../index.css";
import Herbs from '../herb/Herbs';
import Recipes from '../recipe/Recipes';
import AccountEdits from './AccountEdits';
import CommentCard from '../comment/CommentProfile';
import { tabPane } from '../helpers/GeneralHelpers';

function Profile() {
    const { user, savedRecipes, savedHerbs, enteredHerbs, enteredRecipes, enteredComments } = useContext(AppContext)
    const [activeTab, setActiveTab] = useState('Saved Herbs')

    const panes = [
        { menuItem: 'Saved Herbs', render: () => tabPane(savedHerbs, <Herbs page='profile - saved' herbs={ savedHerbs }/>, 'No saved herbs.')},

        { menuItem: 'Saved Recipes', render: () => tabPane(savedRecipes, <Recipes page='profile - saved' recipes={ savedRecipes }/>, 'No saved recipes.')},

        { menuItem: 'Entered Herbs', render: () => tabPane(enteredHerbs, <Herbs herbs={ enteredHerbs } page='profile - entered'/>, 'No entered herbs.')},

        { menuItem: 'Entered Recipes', render: () => tabPane(enteredRecipes, <Recipes recipes={ enteredRecipes } page='profile - entered'/>, 'No entered recipes.')},

        { menuItem: 'Entered Comments', render: () => tabPane(enteredComments, <CommentCard comments={ enteredComments } />, 'You have not left any comments.')},

        { menuItem: 'Account Settings', render: () => 
            <Tab.Pane attached={false}>
                <AccountEdits />
            </Tab.Pane> }
    ]

    return (
        <div className='profile'>
            <Grid>
                <Grid.Column width={ 2 }>
                    <div className='avatar-circle'>
                        <Image 
                            className="ui centered circular image"
                            size='small'
                            src={ user.image_url }
                        />
                    </div>
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