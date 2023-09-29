import React, { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";
import {createGlobalStyle} from 'styled-components';
import Authentication from './components/Authentication'
import NavBar from './components/NavBar'




function App() {

  const [herbs, setHerbs] = useState([])
  const [properties, setProperties] = useState([])
  const [recipes, setRecipes] = useState([])
  const [user, setUser] = useState(null)

  useEffect(() => {
    fetchUser()
    fetchHerbs()
    fetchProperties()
    fetchRecipes()
  },[])


  const fetchHerbs = () => (
    fetch('http://localhost:5555/herbs')
    .then(resp => resp.json())
    .then(data => setHerbs(data))
  )
  const fetchProperties = () => (
    fetch('http://localhost:5555/properties')
    .then(resp => resp.json())
    .then(data => setProperties(data))
  )

  const fetchRecipes = () => (
    fetch('http://localhost:5555/recipes')
    .then(resp => resp.json())
    .then(data => setRecipes(data))
  )

  const fetchUser = () => (
    fetch('http://localhost:5555/checksession')
    .then(resp => {
      if(resp.ok){
        resp.json()
        .then(data => {
          setUser(data)
          fetchProperties()
          fetchHerbs()
          fetchRecipes()
        })
      } else {
        console.log('no user found')
        setUser(null)
      }
    })
  )
  const updateUser = (user) => setUser(user)
  if(!user) return (
    <>
    <GlobalStyle />
    <NavBar />
    <Authentication updateUser={updateUser}/>
    </>
  )
  return (
    <>
    <GlobalStyle />
    <h1>Welcome!</h1>
    <NavBar updateUser={updateUser} />
      <Switch>
        <Route path='http://localhost:5555/herbs'>

        </Route>
        <Route exact path='/authentication'>
          <Authentication updateUser={updateUser}/>
        </Route>
      </Switch>
    </>
  )
}

export default App;

const GlobalStyle = createGlobalStyle`
    body{
      background-color: black; 
      color:white;
    }
    `
