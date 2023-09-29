import { useState } from 'react'
import {Link} from 'react-router-dom'
import styled from 'styled-components'
import { useHistory } from 'react-router-dom'
import { GiHamburgerMenu } from 'react-icons/gi'

function NavBar({updateUser}) {
    const [menu, setMenu] = useState(false)
    const history = useHistory()
   
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
        <Nav> 
         <NavH1>Holistic Home Herbalist</NavH1>
         <Menu>
           {!menu?
           <div onClick={() => setMenu(!menu)}>
             <GiHamburgerMenu size={30}/> 
           </div>:
           <ul>
            <li onClick={() => setMenu(!menu)}>x</li>
            <li><Link to='http://localhost:5555/herbs'>New Herb</Link></li>
            <li><Link to='/'> Home</Link></li>
            <li><Link to='/authentication'> Login/Signup</Link></li>
            <li onClick={handleLogout}> Logout </li>
           </ul>
           }
         </Menu>

        </Nav>
    )

}

export default NavBar

    const NavH1 = styled.h1`
font-family: 'Splash', cursive;
`
const Nav = styled.div`
  display: flex;
  justify-content:space-between;
  
`;

const Menu = styled.div`
  display: flex;
  align-items: center;
  a{
    text-decoration: none;
    color:white;
    font-family:Arial;
  }
  a:hover{
    color:pink
  }
  ul{
    list-style:none;
  }
  
`;