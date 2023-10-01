import React, { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";
import {createGlobalStyle} from 'styled-components';
import Authentication from './components/Authentication'
import NavBar from './components/NavBar'
import Herbs from './components/Herbs'
// import { Grid } from 'semantic-ui-react'
import Recipes from './components/Recipes'
import Properties from './components/Properties'
import Home from './components/Home'




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
    .then(setHerbs)
  )
  const fetchProperties = () => (
    fetch('http://localhost:5555/properties')
    .then(resp => resp.json())
    .then(setProperties)
  )

  const fetchRecipes = () => (
    fetch('http://localhost:5555/recipes')
    .then(resp => resp.json())
    .then(setRecipes)
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
    <NavBar updateUser={updateUser} user={user}/>
      <Switch>
        <Route exact path="/herbs">
          <Herbs herbs={herbs}/>
        </Route>
        <Route exact path="/recipes">
          <Recipes recipes={recipes}/>
        </Route>
        <Route exact path="/properties">
          <Properties properties={properties}/>
        <Route exact path='/authentication'>
          <Authentication updateUser={updateUser}/>
        </Route>
        </Route>
        <Route exact path='/'>
          <Home />
        </Route>            
      </Switch>
    </>
  )
}

export default App;

const GlobalStyle = createGlobalStyle`
    body{
      background-color: #3A7C0A4D; 
      color:white;
    }
    `
