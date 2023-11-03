import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { Icon, Menu, Image } from 'semantic-ui-react'
import { AppContext } from '../context/AppContext'


function NavBar() {
    const { loggedIn, logout } = useContext(AppContext)
    
    const handleLogout = () => {
       fetch('/api/logout', {
        method: 'DELETE'
       }).then(() => logout())
    }

    const authOptions =  
    <>
        <Menu.Item as={Link} to="/">
            <Icon name='home' />
                Home
        </Menu.Item>
        <Menu.Item as={Link} to="/profile">
            <Icon name='user circle'/>
                Profile
        </Menu.Item>
        <Menu.Item as={Link} to="/herbs">
            <Icon name='leaf' />
                Herbs
        </Menu.Item>
        <Menu.Item as={Link} to="/recipes">
            <Icon name='utensils' />
                Recipes
        </Menu.Item>
        <Menu.Item as={Link} to="/properties">
            <Icon name='unordered list'/>
                Properties
        </Menu.Item>
        <Menu.Item as={Link} to="/" onClick={ handleLogout }>
            <Icon name='sign out'/>
                Logout
        </Menu.Item> 
    </>

    const authRequiredOptions =
    <>
        <Menu.Item as={Link} to="/login">
            <Icon name='sign in' />
                Sign in/Sign up
        </Menu.Item> 
    </>

    return (
        (loggedIn ? 
            <> 
                <Menu icon='labeled' inverted fluid widths={ 6 }>
                    { authOptions }
                </Menu>
                <br/>
                <Image src={'/Logo-white.png'} size='small'/>
            </> : 
            <>
                <Menu icon='labeled' inverted fluid widths={ 2 }>
                    { authRequiredOptions }
                </Menu>
                <br/>
                <Image src={'/Logo-white.png'} size='small'/>
            </> )
    ) 
}

export default NavBar
