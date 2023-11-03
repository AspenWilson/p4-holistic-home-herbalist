import React, { useEffect, useState, useContext } from "react";
import { useParams } from 'react-router-dom';
import { Card, Comment, Button, Grid, Header, Divider } from 'semantic-ui-react'
import CommentCard from "./CommentRecipe";
import { Formik, Form } from "formik"
import * as yup from "yup"
import { headers, filterAlphabetically, basicFetch } from "./helpers/GeneralHelpers";
import { AppContext } from "../context/AppContext";
import { CommentInitalValues } from "./helpers/FormHelpers";
import { StyledCardDescription, StyledTextBox } from "./helpers/StylingHelpers"
import { GoBack, RecipeUnLinkedList, UnLinkedLists } from "./helpers/CardHelpers";


function Recipe(){
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null)
  const [ingredients, setIngredients] = useState([])
  const { refreshComments, user } = useContext(AppContext)

  useEffect(() => {
    fetch(`/api/recipes/${id}`)
      .then((resp) => resp.json())
      .then((data) => setRecipe(data))
  }, [id]);
    
  useEffect(() => {
    fetch(`/api/recipes/${id}/ingredients`)
    .then((resp) => resp.json())
    .then((data) => setIngredients(data))
  }, [id])

  const formSchema = yup.object().shape({
    comment: yup.string()
  })

  const handleSubmit = (values, {resetForm}) => {
    const newComment = {
      comment : values.comment
    }
    fetch(`/api/recipes/${id}/comments`, {
      method: "POST",
      headers, 
      body: JSON.stringify(newComment, null, 2)
    })
    .then((resp) => {
      if(resp.ok) {
        resp.json().then(data => {
          resetForm({ values: CommentInitalValues })
          refreshComments(user)
          basicFetch(`/api/recipes/${id}`, setRecipe)
        })
      }
    })
  }
    
  if (!recipe) {
    return <div>Loading...</div>;
  }

  const ingredientsList = ingredients.length > 0 ? <RecipeUnLinkedList arr={ ingredients} name={'Herb'} />
    : ( <h3>No ingredients listed for this recipe.</h3>);
    
  const filteredProperties = filterAlphabetically(recipe.properties)
  
  const comments = recipe.comments.length > 0 ? (
    recipe.comments.map((comment) => {
      return (
        <CommentCard comment={comment} />
      )
    })) : <h3> No comments have been posted to this recipe. </h3>
    
  return (
    <div>
      <GoBack />
      <Card raised fluid style= {{ backgroundColor: 'rgba(52, 52, 52, 0.8)', padding: '10px' }} className='flex-outer'>
        <Card.Content>
          <Header as='h1' style={{ color: 'white' }}>{recipe.name}</Header>
          <span style={{ color: 'white' }}><i>Entered by: {recipe.entered_by.username}</i></span>
          <Divider />
          <Grid columns ={ 2 }>
            <Grid.Column>
              <StyledCardDescription>Directions</StyledCardDescription>
              <br />
              { recipe.directions }
              <Card.Content extra>
                <br />
                <StyledCardDescription as='h1'>Ingredients</StyledCardDescription>
                <br />
                  <Card.Group itemsPerRow={ 2 }>
                  { ingredientsList }
                  </Card.Group>
              </Card.Content>
            </Grid.Column>

            <Grid.Column>
              <StyledCardDescription>Properties:</StyledCardDescription>
                <UnLinkedLists arr={ filteredProperties } variable1={ 'name' } variable2={ 'description' } />
            </Grid.Column>
          </Grid>
        </Card.Content>
        <Divider />
        <StyledCardDescription as='h1'>Comments</StyledCardDescription>
          <Grid columns={ 2 }>
            <Grid.Column>
              <Card.Content>
                <Comment.Group>
                  { comments }
                </Comment.Group>
              </Card.Content>
            </Grid.Column>
            <Grid.Column>
              <Formik 
                initialValues={ CommentInitalValues }
                validationSchema={ formSchema }
                onSubmit={ handleSubmit }
              >

              {(formik) => (
                <Form >
                  <StyledTextBox name='comment' onChange={ formik.handleChange } value={ formik.values.comment } />
                <Form/>
                <Button content='Add Comment' type='submit' labelPosition='left' icon='edit' style={{ backgroundColor: '#056d52', color:'white' }} />
              </Form>
              )}
              </Formik>
            </Grid.Column>
          </Grid>
      </Card>
    </div>
  );
}

export default Recipe