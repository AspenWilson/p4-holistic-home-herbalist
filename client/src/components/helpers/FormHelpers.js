import React, {useState, useEffect, useContext} from 'react'
import { UserContext } from '../../context/UserContext'
import { Form } from 'semantic-ui-react'
import { useFormik } from 'formik'



  export const herbFormInputs = [
    {dataName: 'name', formName: 'Herb Name', type: 'text'},
    {dataName: 'latin_name', formName: 'Latin Name', type: 'text'},
    {dataName: 'description', formName: 'Description', type: 'text'},
    {dataName: 'warnings', formName: 'Warnings', type: 'text'},
    {dataName: 'image_url', formName: 'Image Link', type: 'text'},
    {dataName: 'dosage_description', formName: 'Image Link', type: 'text'}
]

export const dosageForm = (valueKey, changeKey) => {
    const options = ['Capsule', 'Capsule or Powder', 'Decoction - Southern','Decoction - Standard','Decoction - Weak', 'Dried', 'Dried Herb', 'Dried or Powdered', 'Dried Seed', 'Essential Oil', 'Extract - Fluid', 'Extract - Solid', 'Extract - Standardized', 'Fresh', 'Fresh Herb', 'Fresh Leaves', 'Fresh or Dried', 'Glycerite', 'Infusion - Cold', 'Infusion - Standard', 'Infusion - Strong', 'Infusion - Weak', 'Infusion - Wine', 'Juice', 'Oil', 'Oil & Salve', 'Powder', 'Syrup', 'Tea', 'Tincture', 'Topical Use']
    const drops = options.map((option) => {
        return (
            <option name={option} key={option} value={option}>{option}</option>
        )
    })
    return (
        <>
        <label>Dosage Description </label>
        <input type='text' name='dosage_description' value={valueKey.dosage_description} onChange={changeKey} />

        <label>Dosage Form </label>
        <select name='dosage_form'>
            <option></option>
            {drops}
        </select> 
        {/* <input type='submit' /> */}
        </>
    )
}


export const recipeFormInputs = [
    {dataName: 'name', formName: 'Recipe Name', type: 'text'},
    {dataName: 'directions', formName: 'Directions', type: 'text'},
    {dataName: 'ingredients', formName: 'Ingredients'}
]

export const recipeInitialValues = {
    name: '',
    directions: ''
}

export const ingredientsInputs = (valueKey, changeValue) => {
    const dosageFormInputs = [
        {dataName: 'amount', formName: 'Amount',type: 'number'}]
    const formInputs = dosageFormInputs.map((input) => {
        return (
            <>
                <label>{input.formName}</label>
                <input 
                    // fluid
                    name={input.dataName}
                    value={valueKey[input.dataName]}
                    onChange={changeValue}
                />
            </>
        )
    })
    return formInputs
}

export const ingredientsDropdowns = (valueKey, changeValue) => {
    const dropdowndata = [
        {dataName: 'amount_type', formName: 'Amount Type', options: ['Part(s)', 'Cup']},
        {dataName: 'herb_type', formName: 'Herb Type', options: ['Key Herb', 'Supporting Herb', 'Catalyst', 'Optional Catalyst', 'Balancing Herb', 'Optional Balancing Herb']}
        ]
    }

export const ingredientInitialValues = {
    amount: '',
    amount_type: '',
    herb_type: '',
    herb_id: ''
}
