import React, { useContext, useState } from "react";
import * as yup from "yup";
import { Formik, Form, FieldArray } from "formik";
import { headers } from "../helpers/GeneralHelpers";
import { Card, Grid, Button } from 'semantic-ui-react';
import { AppContext } from '../../context/AppContext';
import { FormHeader } from "../helpers/StylingHelpers";
import { RecipeInitialValues, IDDropdowns, amountTypeDrops, herbTypeDrops, FormInputField, FormTextBoxField, FormSelectField, displayErrors, SubmitBtn } from "../helpers/FormHelpers";


function RecipeForm () {
  const { herbs, handleModalSuccess, refreshEnteredRecipes, user, refreshRecipes } = useContext(AppContext)
  const [error, setError] = useState()

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
      method:"POST",
      headers,
      body: JSON.stringify(newRecipeValues, null, 2),
    })
    .then((resp) => {
      if(resp.ok) {
        resp.json().then(data => {
          handleModalSuccess()
          refreshEnteredRecipes(user)
          refreshRecipes()
          resetForm({ values:RecipeInitialValues })
        })
      } else {
        resp.json().then((err) => setError(err.message))
      }
    })
    }

  return (
    <Formik 
      initialValues = { RecipeInitialValues }
      validationSchema = { formSchema }
      onSubmit = { handleSubmit }
    >
    {(formik) => (
      <div className="container">
        <Card fluid className="flex-outer">
        <Form>
        {displayErrors({ error })}
          <Card.Content className="allCards">
            <FormInputField label='Recipe Name' name='name' type='text' formik={ formik } error={ error }/>
            <FormTextBoxField label='Directions' name='directions' formik={ formik } error={ error }/>

            <FieldArray name="ingredients">
            {({ push, remove }) => (
              <div>
                <FormHeader as='h3'>Add Ingredients</FormHeader>
                {formik.values.ingredients.map((_, index) => (
                    <div key={ index }>
                    <Grid columns={ 2 }>
                      <Grid.Column>
                      <FormInputField label='Amount' name={`ingredients[${index}].amount`} type='number' formik={ formik } error={ error }/>
                      </Grid.Column>
                        
                      <Grid.Column>
                      <FormSelectField label='Amount Type' name={`ingredients[${index}].amount_type`} formik={ formik } options={amountTypeDrops} error={ error }/>

                      </Grid.Column>
                    </Grid>

                    <Grid columns={2}>
                      <Grid.Column>
                        <FormSelectField label='Herb' name={`ingredients[${index}].herb_id`} formik={ formik } options={IDDropdowns(herbs)} error={ error }/>

                      </Grid.Column>

                      <Grid.Column>
                      <FormSelectField label='Herb Type' name={`ingredients[${index}].herb_type`} formik={ formik } options={herbTypeDrops} error={ error }/>

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
          <SubmitBtn msg='Submit'/>
        </Card.Content>
      </Form>            
      </Card>
    </div>
    )}
  </Formik>
  )
}

export default RecipeForm