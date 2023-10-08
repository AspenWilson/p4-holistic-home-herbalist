import React, { useContext, useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";
import { createGlobalStyle } from "styled-components";
import { url, basicFetch } from "./helpers";

import { UserContext, UserProvider } from "./context/UserContext";

import Herb from "./components/Herb";
import Herbs from "./components/Herbs";
import Recipe from "./components/Recipe";
import Recipes from "./components/Recipes";
import Property from "./components/Property";
import Properties from "./components/Properties";

import Home from "./components/Home";
import NavBar from "./components/NavBar";
import Profile from "./components/Profile";
import Authentication from "./components/Authentication";

function App() {

  return (
    <UserProvider>
     <GlobalStyle />
     <NavBar />
      <Switch>
        <Route exact path='/login'>
          <Authentication />
        </Route>
        <Route exact path='/herbs'>
          <Herbs profileHerbs={false}/>
         </Route>
         <Route path='/profile'>
           <Profile  />
          </Route>
          <Route exact path='/recipes'>
           <Recipes profileRecipes={false}/>
          </Route>
          <Route exact path='/recipes/:id'>
           <Recipe />
          </Route>
          <Route exact path='/properties'>
           <Properties/>
          </Route>
          <Route exact path='/properties/:id'>           
            <Property />
          </Route>
          <Route exact path='/herbs/:id'>
           <Herb />
          </Route>
          <Route exact path='/'>
            <Home/>
          </Route>
        </Switch>
      </UserProvider>
  )
}

export default App;

const GlobalStyle = createGlobalStyle`
    body{
      background-color: #3A7C0A4D; 
    }
    `
