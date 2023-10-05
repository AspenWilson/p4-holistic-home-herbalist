import React, { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";
import { createGlobalStyle } from "styled-components";
import Authentication from "./components/Authentication";
import NavBar from "./components/NavBar";
import Herbs from "./components/Herbs";
import Recipes from "./components/Recipes";
import Properties from "./components/Properties";
import Home from "./components/Home";
import Herb from "./components/Herb";
import Profile from "./components/Profile";
import Recipe from "./components/Recipe";
import Property from "./components/Property";
import { url, basicFetch } from "./helpers";

function App() {
  const [herbs, setHerbs] = useState([]);
  const [properties, setProperties] = useState([]);
  const [recipes, setRecipes] = useState([]);
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [savedHerbs, setSavedHerbs] = useState([])
  const [savedRecipes, setSavedRecipes] = useState([])


  // function filterEnteredHerbs(herbsData, userId){
  //   const enteredHerbsList= herbsData.filter((herb) => herb.entered_by_id === userId);
  //   setEnteredHerbs(enteredHerbsList)
  // };

  // const fetchUser = () => {
  //   fetch(url + "/checksession")
  //     .then((resp) => {
  //       if (resp.ok) {
  //         resp.json().then((data) => {
  //           setUser(data);
  //           fetchProperties();
  //           fetchHerbs();
  //           fetchRecipes();
  //         });
  //       } else {
  //         console.log("no user found");
  //         setUser(null);
  //       }
  //     });
  // };


  const login = (user) => {
    setUser(user)
    basicFetch(url, "/herbs", setHerbs)
    basicFetch(url, "/recipes", setRecipes)
    basicFetch(url, "/properties", setProperties)
    setIsLoggedIn(true)
    setSavedHerbs(user.saved_herbs)
    setSavedRecipes(user.saved_recipes)
  }
  if(!user) return (
    <>
      <GlobalStyle />
      <NavBar/>
      <Authentication updateUser={login}/>
    </>
  )
  return (
    <>
    <GlobalStyle />
    <NavBar updateUser={login} user={user}/>
      <Switch>
        <Route exact path='/herbs'>
          <Herbs 
            herbs={herbs} 
            user={user} 
            properties={properties} 
          />
        </Route>
        <Route path='/profile'>
          <Profile 
            user={user}
            savedHerbs={savedHerbs}
            savedRecipes={savedRecipes}
            herbs={herbs}
            recipes={recipes}
            properties = {properties}
          />
        </Route>
        <Route exact path='/authentication'>
          <Authentication updateUser={login}/>
        </Route>
        <Route exact path='/recipes'>
          <Recipes recipes={recipes} user ={user}/>
        </Route>
        <Route exact path='/recipes/:id'>
          <Recipe user={user}/>
        </Route>
        <Route exact path='/properties'>
          <Properties 
            properties={properties} 
            user={user}
          />
        </Route>
        <Route exact path='/properties/:id'>
          <Property user={user}/>
        </Route>
        <Route exact path='/herbs/:id'>
          <Herb user={user}/>
        </Route>
        <Route exact path='/'>
          <Home user={user}/>
        </Route>
      </Switch>
    </>
  )
}

export default App;

const GlobalStyle = createGlobalStyle`
    body{
      background-color: #3A7C0A4D; 
    }
    `
