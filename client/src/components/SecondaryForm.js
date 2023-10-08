import React, {useState, useContext} from 'react'
import styled from 'styled-components'
import { useHistory } from 'react-router-dom'
import { Form } from 'semantic-ui-react'
import { useFormik } from "formik"
import * as yup from "yup"
import { dosageFormInputs, dosageDropdowns, ingredientsFormInputs, dosageInitialValues, ingredientInitialValues } from '../helpers'
import { UserContext } from '../context/UserContext'

function SecondaryForm ({newHerb}) {
    const {ingredientDropdowns} = useContext(UserContext)
    const formSchema = newHerb
    ? yup.object().shape({
        dosage_description: yup.string().required(),
        dosage_form: yup.string().required()
    })
    : yup.object().shape({
        amount: yup.number().required(),
        amount_type: yup.string().required(),
        herb_type: yup.string().required(),
        herb_id: yup.string().required()
    })

    const initialValues = newHerb 
        ? dosageInitialValues
        : ingredientInitialValues
    
    const formik = useFormik({
        initialValues: {initialValues},
        validationSchema: formSchema,
        onSubmit: (values) => {
            console.log(values)
        }
      })
    
    const dosageInputs = dosageFormInputs.map((input) => {
        return (
            <div key={input.dataName}>
                <label>{input.formName}</label>
                <input 
                    type={input.type}
                    name={input.dataName}
                    value={formik.values[input.dataName]}
                    onChange={formik.handleChange}
                />
            </div>
    )})

    const dosageDrops = dosageDropdowns.map((dropdown) => {
        return (
            <div key={dropdown.dataName}>
                <Form.Select
                    fluid 
                    name={dropdown.dataName}
                    options={dropdown.options}
                    value={formik.values[dropdown.dataName]}
                    onChange={formik.handleChange}
                />
            </div>
        )
    })

    const ingredientsInputs = ingredientsFormInputs.map((input) => {
        return (
            <div key={input.dataName}>
                <label>{input.formName}</label>
                <input 
                    type={input.type}
                    name={input.dataName}
                    value={formik.values[input.dataName]}
                    onChange={formik.handleChange}
                />
            </div>
        )
    }) 

    const ingredientsDrops = ingredientDropdowns.map((dropdown) => {
        return (
            <div key={dropdown.dataName}>
                <Form.Select
                    fluid 
                    name={dropdown.dataName}
                    options={dropdown.options}
                    value={formik.values[dropdown.dataName]}
                    onChange={formik.handleChange}
                />
            </div>
        )
    })
    const formInputs = newHerb
      ? (
            <>
            {dosageInputs}
            {dosageDrops}
            </>
      )
      : (
        <>
        {ingredientsInputs}
        {ingredientsDrops}
        </>
      )
    return (
        <div>
        <Form onSubmit={formik.handleSubmit}>
          {formInputs}
          <input type='submit' />
        </Form> 
        </div>
      )
}

export default SecondaryForm