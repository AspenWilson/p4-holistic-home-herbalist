import React, { useContext } from 'react'
// import { useHistory } from 'react-router-dom'
import { Link } from 'react-router-dom'
// import { Icon, Menu, Segment, Sidebar } from 'semantic-ui-react'
// import { UserContext } from '../context/UserContext'


function NavBar({user}) {
    
    // const handleLogout = e => {
    //    e.preventDefault()
    //    fetch('http://localhost:5555/logout', {
    //     method: 'DELETE'
    //    })
    //    .then(() => onLogout())
    // }

    return (
        <header>
          <h1>
            <Link to="/">Home</Link>
          </h1>
          {user ? (
            <div>
                {/* <li><Link to="#" onClick={ handleLogout }>Logout</Link></li> */}
                <li><Link to="/herbs">Herbs</Link></li>
                <li><Link to="/recipes">Recipes</Link></li>
                <li><Link to="/properties">Properties</Link></li>
                <li><Link to="/profile">Profile</Link></li>
            </div>
          ) : (
            <Link to="/authentication">Click Here to Login</Link>
          )}
        </header>
      );

    // const displayOptions = 
    // <>
    // <li><Link to="#" onClick={ handleLogout }>Logout</Link></li>
    // <li><Link to="/herbs">Herbs</Link></li>
    // <li><Link to="/recipes">Recipes</Link></li>
    // <li><Link to="/profile/:id">Profile</Link></li>
    // </> 

    // return (
    //     <ul>
    //     <li><Link to="/">Home</Link></li>
    //     { displayOptions }
    //     </ul>
    // )

    // const displayedOptions = loggedIn ? <>
    //     <Menu.Item as={Link} to="/herbs">
    //         <Icon name='leaf' />
    //           Herbs
    //     </Menu.Item>
    //     <Menu.Item as={Link} to="/recipes">
    //         <Icon name='utensils' />
    //           Recipes
    //     </Menu.Item>
    //     <Menu.Item as={Link} to="/properties">
    //         <Icon name='unordered list'/>
    //           Properties
    //     </Menu.Item>
    //     <Menu.Item as={Link} to="/logout" onClick={handleLogout}>
    //         <Icon name='sign-out'/>
    //           Logout
    //     </Menu.Item>
    // </> : <>
    //     <Menu.Item as={Link} to="/authentication">
    //         <Icon name='sign in' />
    //           Sign in/Sign up
    //     </Menu.Item>  
    // </>

    // return (
    //     <Sidebar.Pushable as={Segment}>
    //       <Sidebar
    //         as={Menu}
    //         animation='overlay'
    //         icon='labeled'
    //         inverted
    //         vertical
    //         visible
    //         width='thin'
    //       >
    //         <Menu.Item as={Link} to="/">
    //           <Icon name='home' />
    //           Home
    //         </Menu.Item>
    //         {displayedOptions}
    //       </Sidebar>
    //     </Sidebar.Pushable>
    // )

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