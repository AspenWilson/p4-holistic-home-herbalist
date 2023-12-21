import React, { useContext, useEffect, useState } from "react";
import * as yup from "yup";
import { Formik, Form } from "formik";
import { Card, Button } from 'semantic-ui-react';
import { AppContext } from '../../context/AppContext';
import SuccessModal from "../modals/SuccessModal";
import { AllFormEdits } from "./RecipeEditHelpers";
import IngredientChanges from "./IngredientChanges";
import { FormHeader } from "../helpers/StylingHelpers";
import IngredientAdditions from "./IngredientAdditions";
import { IDDropdowns, displayErrors } from "../helpers/FormHelpers";
import { headers, basicFetch, dividerBreaks } from "../helpers/GeneralHelpers";


function RecipeEdits ({ id }) {
    const { user, herbs, refreshRecipes, refreshEnteredRecipes } = useContext(AppContext)
    const [recipe, setRecipe] = useState(null)
    const [show, setShow] = useState(false)
    const [ingredients, setIngredients] = useState([])
    const [statusIs, setStatus] = useState(null)
    const [error, setError] = useState()

    useEffect(() => {
        basicFetch(`/api/recipes/${id}`, setRecipe)
        basicFetch(`/api/recipes/${id}/ingredients`, setIngredients)
    }, [id])

    const formSchema = yup.object().shape({
        name: yup.string().required("Herb name is required."),
        directions: yup.string().min(50, "Directions must be at least 50 characters.").required("Directions are required."),
    })

    const ingredientSchema = yup.object().shape({
        amount: yup.number().required("Ingredient amount is required."),
        amount_type: yup.string().required("Amount type is required."),
        herb_type: yup.string().required("Herb type is required."),
        herb_id: yup.string().required("Herb must be selected.")
    })

    const successFunctions = (user) => {
        basicFetch(`/api/recipes/${id}`, setRecipe)
        basicFetch(`/api/recipes/${id}/ingredients`, setIngredients)
        refreshEnteredRecipes(user)
        refreshRecipes()
        setStatus('success')
        setError('')
    }

    const PatchRequest = (values, name) => {
        const updatedInfo ={
            [name] : values[name]
        }
        fetch(`api/recipes/${id}`, {
            method: 'PATCH', 
            headers, 
            body: JSON.stringify(updatedInfo, null, 2)
        }).then((resp) => {
            if (resp.ok) {
                resp.json().then((data) => {
                    successFunctions(user)
                })
            } else { 
                resp.json().then((err) =>{ 
                    setError(err.message)
                    setStatus('cancelled')
                })
            }
        })
    }

    const DeleteRequest = ({ingredient}) => {
        fetch(`/api/recipes/${id}/ingredients/${ingredient.id}`, {
            method: 'DELETE'
        }).then(() => {
            successFunctions(user)
        })
    }

    const showFalse = () => { setShow(false) }
    const showTrue = () => { setShow(true) }

    if (!recipe) {
        return <div>Loading...</div>
    }

    return (
        <div className='container'>
            <Card fluid className='flex-outer'>
                <Formik 
                    initialValues={{
                        name: recipe.name || "",
                        directions: recipe.directions || ""
                    }}
                    enableReinitialize={ true }
                    validationSchema={ formSchema }
                >
                {(formik) => (
                    <Form>
                        <Card.Content style={{ padding: '15px'}} >
                        {displayErrors({ error })}
                            <AllFormEdits  
                                itemValue={recipe.name}
                                name='name' 
                                type='text'
                                inputType='input' 
                                formik={ formik } 
                                label='Recipe Name:'
                                handleFieldSubmit={(values) => PatchRequest(values, 'name')}
                                statusIs={statusIs}
                            />
                            <br />
                            <AllFormEdits  
                                itemValue={recipe.directions}
                                name='directions' 
                                type='textarea' 
                                inputType='textarea'
                                formik={ formik } 
                                label='Directions:'
                                handleFieldSubmit={(values) => PatchRequest(values, 'directions')}
                            />
                        </Card.Content>
                    </Form>
                )}
                </Formik>
                <SuccessModal statusIs={statusIs} setStatus={setStatus} />
                <Card.Content  >
                    <FormHeader as='h3'>Existing Ingredients</FormHeader>
                    {dividerBreaks()}
                    {ingredients.length > 0 ? 
                        <>
                        <Card.Group itemsPerRow={2} style={{ padding: '20px'}}>
                        {ingredients.map((ingredient) => (
                            <Formik 
                                key={ingredient.id}
                                initialValues={{
                                    amount: ingredient.amount,
                                    amount_type: ingredient.amount_type,
                                    herb_type: ingredient.herb_type,
                                    herb_id: ingredient.herb_id
                                }}
                                enableReinitialize={ true }
                                validationSchema={ ingredientSchema }
                            >
                            {(formik) => (
                                <IngredientChanges
                                    ingredient={ingredient} 
                                    formik={formik} 
                                    setError = {setError}
                                    handleDelete={({ingredient}) => DeleteRequest({ingredient})} 
                                    herbDrops={IDDropdowns(herbs)}
                                    id= {id}
                                    successFunctions = {successFunctions}
                                />
                            )}
                            </Formik>
                        ))}
                        </Card.Group>
                        </> :
                            <h3 className='allCards'>No ingredients have been entered.</h3>
                    }
                    {dividerBreaks()}
                    <Formik 
                        initialValues={{
                            amount: "", 
                            amount_type: "",
                            herb_type: "",
                            herb_id: ""
                        }}
                        enableReinitialize={true}
                        validationSchema={ingredientSchema}
                    >
                    {(formik) => (
                        <Form>
                            {show === false ?( 
                                <Button icon='add' key='add' onClick={showTrue} fluid>
                                   Add new ingredients to this recipe
                                </Button>) : 
                                <IngredientAdditions 
                                    formik={ formik }
                                    showFalse={showFalse} 
                                    herbs={herbs}
                                    successFunctions={successFunctions}
                                    id={id}
                                    setError= {setError}
                                />
                            }
                        </Form>
                    )}
                    </Formik> 
                </Card.Content>
            </Card>
        </div>
    )
}


export default RecipeEdits