import React, { useState, useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import { createGlobalStyle } from "styled-components";

import { AppProvider } from "./context/AppContext";

import Herb from './components/herb/Herb';
import Herbs from "./components/herb/Herbs";
import Recipe from "./components/recipe/Recipe";
import Recipes from "./components/recipe/Recipes";
import Properties from "./components/Properties";
import DosageGuide from "./components/DosageGuide";
import RecipeGuide from "./components/RecipeGuide";
import Home from "./components/Home";
import NavBar from "./components/NavBar";
import Profile from "./components/profile/Profile";
import Resources from "./components/Resorces";
import Authentication from "./components/Authentication";
import ContactForm from "./components/emailjs/ContactForm";

function App() {
  const [user, setUser] = useState(null)

  useEffect(() => {
    fetch(`api/checksession`)
    .then((resp) => {
      if (resp.ok) {
        resp.json()
        .then (data => {
          setUser(data)
        })
      }
    })
  },[])

    if (!user) return (
      <AppProvider>
        <GlobalStyle />
        <NavBar />
        <Authentication />
      </AppProvider>
    )

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
          <Route exact path='/dosageguide'>
           <DosageGuide />
          </Route>
          <Route exact path='/recipeguide'>
           <RecipeGuide />
          </Route>
          <Route exact path='/contact'>
            <ContactForm />
          </Route>
          <Route exact path='/sources'>
            <Resources />
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
