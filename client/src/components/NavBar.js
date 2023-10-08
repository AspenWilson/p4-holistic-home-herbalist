import React, { useContext } from 'react'
// import { useHistory } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { Icon, Menu, Segment, Sidebar } from 'semantic-ui-react'
import { UserContext } from '../context/UserContext'


function NavBar() {
    const { loggedIn, logout } = useContext(UserContext)
    const handleLogout = () => {
       fetch('/api/logout', {
        method: 'DELETE'
       })
       .then(() => logout())
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
        <Menu.Item as={Link} to="/" onClick={handleLogout}>
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
        <Menu icon='labeled' inverted fluid widths={6}>
            {authOptions}
            {/* <Menu.Item as={Link} to="/">
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
        <Menu.Item as={Link} to="/" onClick={handleLogout}>
            <Icon name='sign out'/>
              Logout
        </Menu.Item> */}
        </Menu>
        : 
        <Menu icon='labeled' inverted fluid widths={2}>
            {authRequiredOptions}
        </Menu>
    )
    ) 

}

export default NavBar

//     const NavH1 = styled.h1`
// font-family: 'Splash', cursive;
// `
// const Nav = styled.div`
//   display: flex;
//   justify-content:space-between;
  
// `;

// const Menu = styled.div`
//   display: flex;
//   align-items: center;
//   a{
//     text-decoration: none;
//     color:white;
//     font-family:Arial;
//   }
//   a:hover{
//     color:pink
//   }
//   ul{
//     list-style:none;
//   }
  
// `;