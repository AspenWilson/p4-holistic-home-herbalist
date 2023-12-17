import React, { useState, useContext } from "react"
import { Button, Card, Grid, Input, Popup } from 'semantic-ui-react'
import { StyledSelect, FormH3 } from "../helpers/StylingHelpers"
import { amountTypeDrops, herbTypeDrops } from "../helpers/FormHelpers"
import { headers } from "../helpers/GeneralHelpers"
import '../../index.css'
import { AppContext } from "../../context/AppContext"

export const IngredientChanges = ({ ingredient, formik, successFunctions, handleDelete, herbDrops, setError, id}) => {
    const {user} = useContext(AppContext)
    const [editState, setEditState] = useState("no edits")

    const handlePatch = (values) => {
        const updatedIngredient = {
            amount: values.amount,
            amount_type: values.amount_type,
            herb_type: values.herb_type,
            herb_id: values.herb_id
        }
        fetch(`api/recipes/${id}/ingredients/${ingredient.id}`, {
            method: 'PATCH', 
            headers, 
            body: JSON.stringify(updatedIngredient, null, 2)
        }).then((resp) => {
            if (resp.ok) {
                resp.json().then(() => {
                    successFunctions(user)
                })
            } else {
                resp.json().then((err) => {
                    setError(err.message)
                    setEditState('cancelled')
                }) 
    }})
}

    const handleSave = () => {
        handlePatch(formik.values)
        setEditState("no edits")
    }

    return (
        <Card style={{ padding: '10px' }} fluid>
            <Grid columns = {2}>
                <Grid.Column width={8}>
                    <h3  style={{ color: 'black' }}>Amount:</h3>
                        {editState === "edits" ? (
                            <>
                            <Input
                                style={{ overflowWrap: 'break-word', width: '100%' }}
                                type='number'
                                name='amount'
                                value={formik.values['amount']}
                                onChange={formik.handleChange}
                            />
                            {formik.touched['amount'] && formik.errors['amount'] && (
                                <div style={{ color: "red" }}>{formik.errors['amount']}</div> )}
                            </>
                        ) : (
                            <FormH3 > {formik.values['amount']} </FormH3>
                        )}
                    <br/>
                    <h3  style={{ color: 'black' }}>Amount Type:</h3>
                    {editState === 'edits' ? (
                        <>
                            <StyledSelect 
                                classNamePrefix="Select"
                                name='amount_type'
                                options={amountTypeDrops}
                                placeholder= {editState === 'cancelled'? ingredient.amount_type : formik.values['amount_type']}
                                onChange={(selectedOption) => {
                                    formik.setFieldValue('amount_type', selectedOption.value)
                                }}
                            />
                            {formik.touched['amount_type'] && formik.errors['amount_type'] && (
                                <div style={{ color: "red" }}>{formik.errors['amount_type']}</div> )}
                        </>
                    ) : (
                            <FormH3 > {formik.values['amount_type']} </FormH3>
                    )}
                </Grid.Column>
                <Grid.Column width = {8}>
                    <h3  style={{ color: 'black' }}>Herb:</h3>
                    {editState === "edits" ? (
                        <>
                            <StyledSelect 
                                classNamePrefix="Select"
                                name='herb_id'
                                options={herbDrops}
                                placeholder={ingredient.herb['name']}
                                onChange={(selectedOption) => {
                                formik.setFieldValue('herb_id', selectedOption.value)
                                }}
                            />
                            {formik.touched['herb_id'] && formik.errors['herb_id'] && (
                                <div style={{ color: "red" }}>{formik.errors['herb_id']}</div> )}
                        </>
                    ) : (
                        <FormH3> {ingredient.herb['name']} </FormH3>
                    )}
                    <br />
                    <h3  style={{ color: 'black' }}>Herb Type:</h3>
                    {editState === "edits" ? (
                        <>
                            <StyledSelect 
                                classNamePrefix="Select"
                                name='herb'
                                options={herbTypeDrops}
                                placeholder={formik.values['herb_type']}
                                onChange={(selectedOption) => {
                                formik.setFieldValue('herb_type', selectedOption.value)
                                }}
                            />
                            {formik.touched['herb_type'] && formik.errors['herb_type'] && (
                                <div style={{ color: "red" }}>{formik.errors['herb_type']}</div> )}
                        </>
                    ) : (
                        <FormH3 > {formik.values['herb_type']} </FormH3>
                    )}
                </Grid.Column>
            </Grid>
            <Grid columns={2}>
                {editState === "edits" ? (
                    <>
                        <Grid.Column style= {{ postion: 'absolute', bottom: '0' }}>
                            <Popup content='Cancel edits' trigger={<Button icon='cancel' fluid style={{ backgroundColor: 'red', color:'white' }} onClick={() => setEditState("cancelled")}  />} />
                        </Grid.Column>
                        <Grid.Column style= {{ postion: 'absolute', bottom: '0' }}>
                            <Popup content='Save changes' trigger={<Button icon='save' fluid style={{ backgroundColor: '#056d52', color:'white' }} onClick={handleSave} />} />
                        </Grid.Column>
                    </>
                ) : (
                    <>
                        <Grid.Column>
                            <Button icon='edit' fluid onClick={() => setEditState("edits")}>Edit</Button>
                        </Grid.Column>
                        <Grid.Column>
                            <Button icon='trash' fluid style={{ backgroundColor: 'red', color:'white' }} onClick={() => handleDelete({ingredient})} >Delete</Button>
                        </Grid.Column>
                    </>
                )}
            </Grid>
        </Card>
    )
}