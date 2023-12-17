import React, { useState, useContext } from "react"
import { Button, Grid, Input, Popup } from 'semantic-ui-react'
import { StyledSelect } from "../helpers/StylingHelpers"
import { amountTypeDrops, IDDropdowns, herbTypeDrops } from "../helpers/FormHelpers"
import { dividerBreaks, headers } from "../helpers/GeneralHelpers"
import '../../index.css'
import { AppContext } from "../../context/AppContext"

export const IngredientAdditions = ({ formik, showFalse, herbs, successFunctions, id, setError }) => {
    const { user } = useContext(AppContext)
    const [inputFields, setInputFields] = useState([
       {amount_type: '', amount: '', herb_type:'', herb_id:''}
    ])

    const addFields = () => {
       let newField = {amount_type: '', amount: '', herb_type:'', herb_id:''}
       setInputFields([...inputFields, newField])
    }

    const removeFields = (index) => {
       let data = [...inputFields]
       if (data.length > 1) { 
           data.splice(index,1)
           setInputFields(data) 
       } else {
           showFalse()
       }
    }
    
    const IngredientAdd = (values) => {
        const newIngredient = {
            amount: values.amount,
            amount_type: values.amount_type,
            herb_type: values.herb_type,
            herb_id: values.herb_id
        }
        fetch(`api/recipes/${id}/ingredients`, {
            method: 'POST', 
            headers, 
            body: JSON.stringify(newIngredient, null, 2)
        }).then((resp) => {
            if (resp.ok) {
                resp.json().then(() => {
                    successFunctions(user)
                })
            } else {
                resp.json().then((err) => {
                    setError(err.message)})
            }
        })
    }

    const handleSave = (index) => {
       IngredientAdd(formik.values)
       removeFields(index)
    }

   return (
       <>
       {inputFields.map((_, index) => {
           return (
               <div key={index}>
                   <Grid columns={3}>
                       <Grid.Column width={4}>
                            <h3  style={{ color: 'black' }}>Amount:</h3>
                            <Input
                                style={{ overflowWrap: 'break-word', width: '100%' }}
                                type='number'
                                name='amount'
                                value={formik.values['amount']}
                                onChange={formik.handleChange}
                            />
                            {formik.touched['amount'] && formik.errors['amount'] && (
                                <div style={{ color: "red" }}>{formik.errors['amount']}</div> )}
                            <br/>
                            <h3  style={{ color: 'black' }}>Amount Type:</h3>
                            <StyledSelect 
                                classNamePrefix="Select"
                                name='amount_type'
                                options={amountTypeDrops}
                                placeholder='Select amount type...'
                                onChange={(selectedOption) => {
                                    formik.setFieldValue('amount_type', selectedOption.value)
                                }}
                            />
                            {formik.touched['amount_type'] && formik.errors['amount_type'] && (
                                <div style={{ color: "red" }}>{formik.errors['amount_type']}</div> )}
                        </Grid.Column>
                        <Grid.Column width={9}>
                            <h3  style={{ color: 'black' }}>Herb:</h3>
                            <StyledSelect 
                                classNamePrefix="Select"
                                name='herb_id'
                                options={IDDropdowns(herbs)}
                                placeholder='Select herb...'
                                onChange={(selectedOption) => {
                                formik.setFieldValue('herb_id', selectedOption.value)
                                }}
                            />
                            {formik.touched['herb_id'] && formik.errors['herb_id'] && (
                                <div style={{ color: "red" }}>{formik.errors['herb_id']}</div> )}
                            <br/>
                            <h3  style={{ color: 'black' }}>Herb Type:</h3>
                            <StyledSelect 
                                classNamePrefix="Select"
                                name='herb_type'
                                options={herbTypeDrops}
                                placeholder='Select herb type...'
                                onChange={(selectedOption) => {
                                formik.setFieldValue('herb_type', selectedOption.value)
                                }}
                            />
                            {formik.touched['herb_type'] && formik.errors['herb_type'] && (
                                <div style={{ color: "red" }}>{formik.errors['herb_type']}</div> )}
                        </Grid.Column>
                        <Grid.Column width={3} style= {{ postion: 'absolute', bottom: '0' }}>
                            <br />
                            <Popup content='Save changes' trigger={<Button  icon='save' fluid style={{ backgroundColor: '#056d52', color:'white' }} onClick={handleSave}/>} />
                            <br/>
                            <Popup content='Delete new addition' trigger={<Button icon='cancel' fluid style={{ backgroundColor: 'red', color:'white' }} onClick={ () => removeFields()}/> } />
                        </Grid.Column>
                    </Grid>
                </div>
            )
        })}
            {dividerBreaks()}
            <Button icon='plus' fluid onClick={addFields}>Add more</Button>
        </>
    )
}