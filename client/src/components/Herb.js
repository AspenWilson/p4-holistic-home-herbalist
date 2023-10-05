import React, {useEffect, useState} from "react";
import { Image } from 'semantic-ui-react'
import { useParams } from 'react-router-dom';
import { url } from "../helpers";

function Herb(){
    const { id } = useParams();
    const [herb, setHerb] = useState(null)

    useEffect(() => {
        fetch(url + `/herbs/${id}`)
          .then((resp) => resp.json())
          .then((data) => {
            setHerb(data);
          })
          .catch((error) => {
            console.error('Error fetching herb details:', error);
          });
      }, [id]);
    
      if (!herb) {
        return <div>Loading...</div>;
      }
    
      const dosagesList = herb.dosages.length > 0 ? (
        herb.dosages.map((dosage) => {
          return (
            <li key={dosage.id}>
              {dosage.dosage_form}: {dosage.dosage_description}
            </li>
          );
        })
      ) : (
        <h3>No dosages listed for this herb.</h3>
      );
    
      const herbProperties = herb.properties.map((property) => {
        return (
          <li key={property.id}>{property.name}</li>
        );
      });
    
      const recipesList = herb.recipes.length > 0 ? (
        herb.recipes.map((recipe) => {
          return (
            <li key={recipe.id}>{recipe.name}</li>
          );
        }) 
      ) : (
        <h3>No recipes with this herb have been created.</h3>
      );
    
      return (
        <div>
          <Image src={herb.image_url} />
          <h1>{herb.name}</h1>
          <h2>{herb.latin_name}</h2>
          <h3>{herb.description}</h3>
          <h3>{herb.warnings}</h3>
          <ul>{dosagesList}</ul>
          <ul>{herbProperties}</ul>
          <ul>{recipesList}</ul>
        </div>
      );
    }

export default Herb