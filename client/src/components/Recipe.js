import React, {useEffect, useState} from "react";
import { Image } from 'semantic-ui-react'
import { useParams } from 'react-router-dom';


function Recipe(){
    const { id } = useParams();
    const [recipe, setRecipe] = useState(null)

    useEffect(() => {
        fetch(`http://localhost:5555/recipes/${id}`)
          .then((resp) => resp.json())
          .then((data) => {
            setRecipe(data);
          })
          .catch((error) => {
            console.error('Error fetching recipe details:', error);
          });
      }, [id]);
    
      if (!recipe) {
        return <div>Loading...</div>;
      }

      const ingredientsList = recipe.ingredients.length > 0 ? (
        recipe.ingredients.map((ingredient) => {
          return (
            <ul key={ingredient.id}>
            <li>Herb Type: {ingredient.herb_type}</li>
            <li>Amount: {ingredient.amount} {ingredient.amount_type}</li>
            {/* <li>Herb: {ingredient.herb.name}</li> */}
            </ul>
          );
        })
      ) : (
        <h3>No ingredients listed for this recipe.</h3>
      );
    
      const recipeProperties = recipe.properties.map((property) => {
        return (
          <li key={property.id}>{property.name}</li>
        );
      });
    
      const herbsList = recipe.herbs.length > 0 ? (
        recipe.herbs.map((herb) => {
          return (
            <li key={herb.id}>{herb.name}</li>
          );
        }) 
      ) : (
        <h3>No herbs have been added to this recipe.</h3>
      );

      const comments = recipe.comments.length > 0 ? (
        recipe.comments.map((comment) => {
            return (
                <>
                <h3>{comment.comment}</h3>
                <h3>Posted by: </h3>
                </>
            )
        })
      ) : <h3> No comments have been posted to this recipe. </h3>
    
      return (
        <div>
          <h1>{recipe.name}</h1>
          <h2>{recipe.directions}</h2>
          <h3>{recipe.entered_by}</h3>
          <ul>{ingredientsList}</ul>
          <ul>{recipeProperties}</ul>
          <ul>{herbsList}</ul>
          <ul>{comments}</ul>
        </div>
      );

}

export default Recipe