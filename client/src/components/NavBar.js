import { useState } from 'react'
import styled from 'styled-components'
import { useHistory } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { Icon } from 'semantic-ui-react'
import { Menu, MenuItem, Sidebar } from "react-pro-sidebar";
import '../stylesheets/NavBar.css'


function NavBar({updateUser, user}) {
    const [menuCollapse, setMenuCollapse] = useState(false)
    const history = useHistory()
   
    const menuIconClick = () => {
      //condition checking to change state from true to false and vice versa
      menuCollapse ? setMenuCollapse(false) : setMenuCollapse(true);
    };
    const handleLogout = () => {
       fetch("http://localhost:5555/logout", {
         method: "DELETE",
       }).then(resp => {
         if(resp.ok){
             updateUser(null)
             history.push('/authentication')
         }
       })
    }
    return (
        <>
          <div id="header">
              {/* collapsed props to change menu size using menucollapse state */}
            <Sidebar >
                <Menu iconShape="circle">
                  <MenuItem active={true} component={<Link to="/" exact/>} icon={<Icon name='home' />}>
                    Home
                  </MenuItem>
                  <MenuItem component={<Link to="/profile" />} icon={<Icon name='user circle' />}>Profile</MenuItem>
                  <MenuItem component={<Link to="/herb" />} icon={<Icon name='leaf' />}>Herbs</MenuItem>
                  <MenuItem component={<Link to="/recipes" />} icon={<Icon name='utensils' />}>Recipes</MenuItem>
                  <MenuItem component={<Link to="/properties" />} icon={<Icon name='unordered list' />}>Properties</MenuItem>
                </Menu>
                <Menu iconShape="circle">
                  <MenuItem component={<Link to="/logout" />} icon={<Icon name='sign-out'/>}>Logout</MenuItem>
                </Menu>
            </Sidebar>
          </div>
        </>
        // <Menu inverted vertical>
        //     <Menu.Item>
        //         <NavLink to="/" exact> Home </NavLink>
        //     </Menu.Item>
        //     <Menu.Item>
        //         <NavLink to="/profile"> Profile </NavLink>
        //     </Menu.Item>
        //     <Menu.Item>
        //         <NavLink to="/herbs"> Herbs </NavLink>
        //     </Menu.Item>
        //     <Menu.Item>
        //         <NavLink to="/recipes"> Recipes </NavLink>
        //     </Menu.Item>
        //     <Menu.Item>
        //         <NavLink to="/properties"> Properties </NavLink>
        //     </Menu.Item>
        // </Menu>

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