import React, { useContext, useEffect, useState } from "react"
import { Formik, Form, FieldArray } from "formik"
import * as yup from "yup"
import { AppContext } from '../../context/AppContext'
import { Card, Grid, Button, Icon } from 'semantic-ui-react'
import { IngredientEditCards } from "../helpers/EditFormHelpers"
import { FormHeader } from "../helpers/StylingHelpers"
import { IDDropdowns, amountTypeDrops, herbTypeDrops, FormInputField, FormTextBoxField, FormSelectField } from "../helpers/FormHelpers"
import { headers } from "../helpers/GeneralHelpers"


function RecipeEdits ({ id }) {
    const { handleModalSuccess, user, herbs, refreshRecipes, refreshEnteredRecipes } = useContext(AppContext)
    const [recipe, setRecipe] = useState(null)
    const [deletedIngredients, setDeletedIngredients] = useState([])
    const [show, setShow] = useState(null)
    const [ingredients, setIngredients] = useState([])

    useEffect(() => {
        fetch(`/api/recipes/${id}`)
        .then ((resp) => resp.json())
        .then ((data) => {
            setRecipe(data)
        })
    }, [id])

    useEffect(() => {
        fetch(`/api/recipes/${id}/ingredients`)
        .then((resp) => resp.json())
        .then((data) => setIngredients(data))
      }, [id])

    const formSchema = yup.object().shape({
        name: yup.string().required("Herb name is required."),
        directions: yup.string().min(50, "Directions must be at least 50 characters.").required("Directions are required."),
        ingredients : yup.array().of(
            yup.object().shape({
                amount: yup.number(),
                amount_type: yup.string(),
                herb_type: yup.string(),
                herb_id: yup.string()
            })
        ).min(1, 'At least one ingredient is required.')
    })

    const handleSubmit = (values) => {
        const updatedRecipe = {
            name: values.name, 
            directions: values.directions, 
            ingredients: values.ingredients
        }
        fetch(`/api/recipes/${id}`, {
            method:'PATCH',
            headers,
            body: JSON.stringify(updatedRecipe, null, 2)
        }).then((resp) => {
            if(resp.ok) {
                resp.json().then((data) => {
                    if (deletedIngredients.length > 0) {
                        deletedIngredients.map((ingredient) => {
                            fetch(`/api/recipes/${recipe.id}/ingredients/${ingredient.id}`, {
                                method:'DELETE'
                        })})
                    }
                    handleModalSuccess()
                    refreshEnteredRecipes(user)
                    refreshRecipes()
                })
            }})
    }

    if (!recipe) {
        return <div>Loading...</div>
    }

    return (
        <Formik 
            initialValues={{
                name: recipe.name || "",
                directions: recipe.directions || "",
                ingredients: show ? [{ amount: "", amount_type: "", herb_id: "", herb_type: "" }] : []
            }}
            enableReinitialize={ true }
            validationSchema={ formSchema }
            onSubmit={ handleSubmit }
        >
        {(formik) => (
            <div className='container'>
            <Card fluid className='flex-outer'>
            <Form>
                <Card.Content className="allCards" >
                    <Grid columns={ 2 }>
                        <Grid.Column>
                            <FormInputField label='Recipe Name' name='name' type='text' formik={ formik } />
                        </Grid.Column>

                        <Grid.Column>
                        <FormTextBoxField label='Directions' name='directions' formik={ formik } />
                        </Grid.Column>
                    </Grid>

                    <FieldArray name='ingredients'>
                    {({ push, remove }) => (
                        <div>
                            <FormHeader as='h3'>Existing Ingredients</FormHeader>
                            <Card.Group>
                                {ingredients.map((ingredient) => {
                                    return (
                                        <IngredientEditCards ingredient={ingredient} deletedIngredients={deletedIngredients} setDeletedIngredients={setDeletedIngredients} />
                                    )
                                })}
                            </Card.Group>

                            {show === true ?
                            formik.values.ingredients.map((_, index) => {
                                return (
                                <div key={ index } >
                                    <Grid columns={ 2 }>
                                        <Grid.Column>
                                        <FormInputField label='Amount' name={`ingredients[${index}].amount`} type='number' formik={ formik } />
                                            <FormSelectField label='Amount Type' name={`ingredients[${index}].amount_type`} formik={formik} options={amountTypeDrops} />
                                        </Grid.Column>

                                        <Grid.Column>
                                        <FormSelectField label='Herb' name={`ingredients[${index}].herb_id`} formik={formik} options={IDDropdowns(herbs)} />
                                            <FormSelectField label='Herb Type' name={`ingredients[${index}].herb_type`} formik={formik} options={herbTypeDrops} />
                                        </Grid.Column>
                                    </Grid>
                                    <Button  onClick={() => remove(index)}>Remove Ingredient</Button>
                                    <Button onClick={() => push({ amount: "", amount_type: "", herb_id:"", herb_type:"" })}>
                                    Add another ingredient
                                    </Button>
                                </div>
                            )}) : null }
                            {show === null ? 
                                <Button onClick={() => {setShow(true)}}>
                                   Add new ingredients to this recipe <Icon name='add' />
                                </Button> : null}
                        </div>
                    )}
                    </FieldArray>                       
                </Card.Content>
                <Button fluid type='submit'>Submit edits</Button>
            </Form>
        </Card>
        </div>
    )}
    </Formik>
    )
}

export default RecipeEdits