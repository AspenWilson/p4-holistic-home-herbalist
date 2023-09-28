import React, { useEffect, useState } from "react";
// import { Switch, Route } from "react-router-dom";
// import {createGlobalStyle} from 'styled-components';


function App() {

  const [herbs, setHerbs] = useState([])
  // const [properties, setProperties] = useState([])
  // const [recipes, setRecipes] = useState([])
  // const [user, setUser] = useState(null)

  // useEffect(() => {
  //   fetchUser()
  //   fetchHerbs()
  //   fetchProperties()
  //   fetchRecipes()
  // },[])

  useEffect(() => {
    fetch('/herbs')
    .then(resp => resp.json())
    .then(herbs => setHerbs(herbs))
  }, [])

  // const fetchProperties = () => (
  //   fetch('/properties')
  //   .then(resp => resp.json())
  //   .then(setProperties)
  // )

  // const fetchRecipes = () => (
  //   fetch('/recipes')
  //   .then(resp => resp.json())
  //   .then(setRecipes)
  // )

  // const fetchUser = () => {
  //   fetch('/checksession')
  //   .then(resp => {
  //     if(resp.ok){
  //       resp.json()
  //       .then(data => {
  //         setUser(data)
  //         fetchHerbs()
  //         fetchProperties()
  //         fetchRecipes()
  //       })
  //     } else {
  //       console.log('no user found')
  //       setUser(null)
  //     }
  //   })
  // }
  return <h1>Phase 4 Project Client</h1>;
}

export default App;
