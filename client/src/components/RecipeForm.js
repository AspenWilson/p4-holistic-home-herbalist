import React, { useContext } from "react"
import { Formik, Form, FieldArray } from "formik"
import * as yup from "yup"
import { UserContext } from "../context/AppContext"
import { headers } from "../helpers"
import { Card, Grid, Button } from 'semantic-ui-react'
import { RecipeInitialValues, IDDropdowns, amountTypeDrops, herbTypeDrops, displayErrors } from "./helpers/FormHelpers"
import { StyledSelect, FormHeader, StyledTextBox, StyledInput } from "./helpers/StylingHelpers"


function RecipeForm () {
  const { herbs, handleModalSuccess, refreshEnteredRecipes, user, refreshRecipes } = useContext(UserContext)

  const formSchema = yup.object().shape({
    name: yup.string().required("Herb name is required."),
    directions: yup.string().required("Directions are required.").min(50, "Directions must be at least 50 characters."),
    ingredients : yup.array().of(
      yup.object().shape({
        amount: yup.number().required("Ingredient amount is required."),
        amount_type: yup.string().required("Amount type is required."),
        herb_type: yup.string().required("Herb type is required."),
        herb_id: yup.string().required("Herb must be selected.")
      })
    ).min(1, 'At least one ingredient is required.')
  })

  const handleSubmit = (values, {resetForm}) => {
    const newRecipeValues =  {
      name: values.name, 
      directions: values.directions,
      ingredients: values.ingredients
    }
    fetch('/api/recipes', {
      method:'POST',
      headers,
      body: JSON.stringify(newRecipeValues, null, 2),
    })
    .then((resp) => {
      if(resp.ok) {
        resp.json().then(data => {
            resetForm({
              values:RecipeInitialValues
            })
            handleModalSuccess()
            refreshEnteredRecipes(user)
            refreshRecipes()
          })
      }})
    }

  return (
    <Formik 
      initialValues = {RecipeInitialValues}
      validationSchema={formSchema}
      onSubmit = {handleSubmit}
    >
    {(formik) => (
      <div className="container">
        <Card fluid className="flex-outer">
        <Form>
          <Card.Content className="allCards">

            <FormHeader as='h3' fluid>Name</FormHeader>
            <StyledInput name='name' onChange={formik.handleChange} value={formik.values.name} />
            {displayErrors(formik.errors.name)}

            <FormHeader as='h3'>Directions</FormHeader>
            <StyledTextBox  name='directions' onChange={formik.handleChange} value={formik.values.directions} />
            {displayErrors(formik.errors.directions)}

            <FieldArray name="ingredients">
            {({ push, remove }) => (
              <div>
                <FormHeader as='h3'>Add Ingredients</FormHeader>
                {formik.values.ingredients.map((_, index) => (
                    <div key={index}>
                    <Grid columns={2}>
                      <Grid.Column>
                        <FormHeader as='h3' fluid >Amount</FormHeader>
                        <StyledInput 
                          name={`ingredients[${index}].amount`}
                          value={formik.values.ingredients.amount}
                          onChange={formik.handleChange}
                        />
                      </Grid.Column>
                        
                      <Grid.Column>
                        <FormHeader as='h3'>Amount Type</FormHeader>
                        <StyledSelect
                          classNamePrefix="Select"
                          name={`ingredients[${index}].amount_type`}
                          options= {amountTypeDrops}
                          onChange={(selectedOption) => {
                            formik.setFieldValue(`ingredients[${index}].amount_type`, selectedOption.value)
                          }}
                        />
                      </Grid.Column>
                    </Grid>

                    <Grid columns={2}>
                      <Grid.Column>
                        <FormHeader as='h3'>Herb</FormHeader>
                        <StyledSelect
                          classNamePrefix="Select"
                          name={`ingredients[${index}].herb_id`}
                          isSearchable
                          isClearable
                          placeholder='Select an herb. Type to search.'
                          options={IDDropdowns(herbs)}
                          onChange={(selectedHerb) => {formik.setFieldValue(`ingredients[${index}].herb_id`, selectedHerb.value)}}
                        />
                      </Grid.Column>

                      <Grid.Column>
                        <FormHeader as='h3'>Herb Type</FormHeader>
                        <StyledSelect
                          classNamePrefix="Select"
                          name={`ingredients[${index}].herb_type`}
                          options={herbTypeDrops}
                          onChange={(selectedOption) => {
                            formik.setFieldValue(`ingredients[${index}].herb_type`, selectedOption.value)
                          }}
                        />
                      </Grid.Column>
                    </Grid>
                    <br/>
                    {index > 0 && (
                      <Button onClick={() => remove(index)}>Remove Ingredient</Button>
                    )}
                  </div>
                ))}
                <br/>
                <Button onClick={() => push({ amount: "", amount_type: "", herb_id:"", herb_type:"" })}>
                  Add Ingredient
                </Button>
              </div>
            )}
          </FieldArray>
          <br/>
          <Button fluid type='submit'>Submit</Button>
        </Card.Content>
      </Form>            
      </Card>
    </div>
    )}
  </Formik>
  )
}

export default RecipeForm