import React, { createContext, useContext, useState, useEffect } from "react";
import { basicFetch } from "../helpers";

const UserContext = createContext();


const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [herbs, setHerbs] = useState([]);
  const [recipes, setRecipes] = useState([]);
  const [properties, setProperties] = useState([]);
  const [savedHerbs, setSavedHerbs] = useState([]);
  const [savedRecipes, setSavedRecipes] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false)
  
  useEffect(() => {
    fetch('/api/checksession')
    .then(resp => {
      if(resp.ok){
        resp.json()
        .then(data => {
          setUser(data)
          console.log('check session triggered')
        })
      } else {
        console.log('hi')
      }
    })
  }, [])

  const handleLogin = (user) => {
    setUser(user);
    basicFetch("/api/herbs", setHerbs)
    basicFetch("/api/recipes", setRecipes)
    basicFetch("/api/properties", setProperties)
    setSavedHerbs(user.saved_herbs)
    setSavedRecipes(user.saved_recipes)
    console.log('fetched all!')  
    setLoggedIn(true)
};

  const fetchUpdatedData = () => {
    basicFetch(`/api/users/${user.id}/saved-herbs`, setSavedHerbs)
    basicFetch(`/api/users/${user.id}/saved-recipes`,setSavedRecipes);
    console.log('fetching updated data')  
    };

  const logout = () => {
    setUser(null);
    setLoggedIn(false)
  };

    const ingredientDropdowns = [
    {dataName: 'amount_type', formName: 'Amount Type', options: ['Part(s)', 'Cup']},
    {dataName: 'herb_type', formName: 'Herb Type', options: ['Key Herb', 'Supporting Herb', 'Catalyst', 'Optional Catalyst', 'Balancing Herb', 'Optional Balancing Herb']},
    {dataName: 'herb_id', formName: 'Herb', options: herbs.map((herb) => ({ value: herb.herb_id, label: herb.name }))}
    ]

  return (
    <UserContext.Provider value={{
        user, 
        setUser, 
        herbs, 
        setHerbs, 
        recipes, 
        setRecipes, 
        properties, 
        setProperties, 
        savedHerbs, 
        setSavedHerbs, 
        savedRecipes, 
        setSavedRecipes, 
        handleLogin, 
        logout, 
        fetchUpdatedData, 
        setLoggedIn, 
        loggedIn,
        ingredientDropdowns
    }}
    >
        {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider }