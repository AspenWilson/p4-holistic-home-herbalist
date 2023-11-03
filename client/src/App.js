import React from "react";
import { Switch, Route } from "react-router-dom";
import { createGlobalStyle } from "styled-components";

import { AppProvider } from "./context/AppContext";

import Herb from "./components/Herb";
import Herbs from "./components/Herbs";
import Recipe from "./components/Recipe";
import Recipes from "./components/Recipes";
import Properties from "./components/Properties";

import Home from "./components/Home";
import NavBar from "./components/NavBar";
import Profile from "./components/Profile";
import Authentication from "./components/Authentication";

function App() {

  return (
    <AppProvider>
     <GlobalStyle />
     <NavBar />
      <Switch>
        <Route exact path='/login'>
          <Authentication />
        </Route>
        <Route exact path='/herbs'>
          <Herbs page='home'/>
         </Route>
         <Route path='/profile'>
           <Profile  />
          </Route>
          <Route exact path='/recipes'>
           <Recipes page='home'/>
          </Route>
          <Route exact path='/recipes/:id'>
           <Recipe />
          </Route>
          <Route exact path='/properties'>
           <Properties/>
          </Route>
          <Route exact path='/herbs/:id'>
           <Herb />
          </Route>
          <Route exact path='/'>
            <Home/>
          </Route>
        </Switch>
      </AppProvider>
  )
}

export default App;

const GlobalStyle = createGlobalStyle`
    body{
      background: url('/leaves.jpeg') center/cover repeat;
      padding: 10px 20px;
      color: white; 
    }
    `
