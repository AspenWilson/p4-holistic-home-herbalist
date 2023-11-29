import React, { createContext, useState, useEffect } from "react";
import { basicFetch, filterAlphabetically } from "../components/helpers/GeneralHelpers";

const AppContext = createContext({});

const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);

  const [herbs, setHerbs] = useState([]);
  const [savedHerbs, setSavedHerbs] = useState([]);
  const [enteredHerbs, setEnteredHerbs] = useState([]);

  const [recipes, setRecipes] = useState([]);
  const [savedRecipes, setSavedRecipes] = useState([]);
  const [enteredRecipes, setEnteredRecipes] = useState([])

  const [properties, setProperties] = useState([]);
  const [secondOpen, setSecondOpen] = useState(false)

  const [enteredComments, setEnteredComments] = useState([])
  
  // Login/Sign Up/Log Out Context


  useEffect(() => {
    fetch('/api/checksession')
    .then(resp => {
      if(resp.ok){
        resp.json()
        .then(data => {
          setUser(data)
        })
      }})}, [])


  const handleLogin = (user) => {
    setUser(user);
    //herb data fetches
    basicFetch("/api/herbs", setHerbs, filterAlphabetically);
    basicFetch(`/api/users/${user.id}/saved-herbs`, setSavedHerbs, filterAlphabetically);
    setEnteredHerbs(filterAlphabetically(user.entered_herbs));
    //recipe data fetches
    basicFetch("/api/recipes", setRecipes, filterAlphabetically);
    basicFetch(`/api/users/${user.id}/saved-recipes`, setSavedRecipes, filterAlphabetically);
    setEnteredRecipes(filterAlphabetically(user.entered_recipes));
    //property fetches
    basicFetch("/api/properties", setProperties, filterAlphabetically);
    basicFetch(`/api/users/${user.id}/comments`, setEnteredComments)
    setLoggedIn(true);
};

  const logout = () => {
    setUser(null);
    setLoggedIn(false)
  };

  // Properties Context

  const refreshProperties = () => {
    basicFetch("/api/properties", setProperties, filterAlphabetically)
  }

  // Herbs Context

  const refreshEnteredHerbs = (user) => {
    fetch(`/api/users/${user.id}`)
    .then((resp) => resp.json())
    .then ((data) => {
      setEnteredHerbs(filterAlphabetically(data.entered_herbs))
    })
    .then(refreshProperties())
  }

  const refreshHerbs = () => {
    basicFetch("/api/herbs", setHerbs, filterAlphabetically)
    refreshProperties()
  }

  const refreshSavedHerbs = (user) => {
    fetch(`/api/users/${user.id}/saved-herbs`)
    .then((resp) => {
      if(resp.ok) {
        resp.json().then((data) => setSavedHerbs(filterAlphabetically(data)))
      }
    })
  }

  //Recipe Context

  const refreshEnteredRecipes = (user) => {
    fetch(`/api/users/${user.id}`)
    .then((resp) => resp.json())
    .then ((data) => {
      setEnteredRecipes(filterAlphabetically(data.entered_recipes))
    })
    .then(refreshProperties())    
  }

  const refreshRecipes = () => {
    basicFetch('/api/recipes', setRecipes, filterAlphabetically)
    refreshProperties()
  }

  const refreshSavedRecipes = (user) => {
    fetch(`/api/users/${user.id}/saved-recipes`)
    .then((resp) => {
      if(resp.ok) {
        resp.json().then((data) => setSavedRecipes(filterAlphabetically(data)))
      }
    })
  }

  //Comments Context

  const refreshEnteredComments = (user) => {
    basicFetch(`/api/users/${user.id}/comments`, setEnteredComments)
  }

  const refreshComments = (user) => {
    basicFetch("/api/recipes", setRecipes, filterAlphabetically);
    basicFetch(`/api/users/${user.id}/comments`, setEnteredComments)
  }

    const handleModalSuccess = () => {
        setSecondOpen(!secondOpen)
    }


  return (
    <AppContext.Provider value={{
        user, //CommentEdits, CommentProfile, HerbCard, HerbEdits, HerbForm, Profile, RecipeCard, RecipeEdits, RecipeForm
        handleLogin, //Authentication
        logout, // NavBar
        loggedIn, // NavBar
        //herbs 
        herbs, // Herbs, PropertyCard, RecipeEdits, RecipeForm
        savedHerbs, // HerbCard, Herbs, Profile
        enteredHerbs, // Herbs, Profile
        refreshEnteredHerbs, // HerbEdits, HerbForm
        refreshHerbs, // HerbEdits, HerbForm
        refreshSavedHerbs, // HerbCard
        //recipes
        recipes, // PropertyCard, Recipes
        savedRecipes, // Profile, RecipeCard, Recipes
        enteredRecipes, // Profile, Recipes
        refreshEnteredRecipes, // RecipeEdits, RecipeForm
        refreshRecipes, // RecipeEdits, RecipeForm
        refreshSavedRecipes, //RecipeCard
        properties, // HerbEdits, HerbForm, Herbs, Recipes
        enteredComments, // Profile
        refreshEnteredComments,//CommentEdits, CommentProfile
        refreshComments,
        handleModalSuccess, //CommentEdits, HerbEdits, HerbForm, ModalPopout, RecipeEdits, RecipeForm
        secondOpen, // ModalPopout
    }}
    >
        {children}
    </AppContext.Provider>
  );
};

export { AppContext, AppProvider }