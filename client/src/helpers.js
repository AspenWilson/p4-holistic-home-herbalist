import React, {useContext} from 'react';
import {Label, Popup, Form } from 'semantic-ui-react'
import { UserContext } from './context/UserContext';

// const {herbs} = useContext(UserContext)
// Property tags for recipe and herb cards
export const propertyTags = (arr) => {
    return arr.properties.map((property) => (
        <Popup content={property.description} trigger={
            <Label color='red' tag key={property.id}>
                {property.name}
            </Label>}
        />
    ));
};

// Functions for data fetching, searches, and filters

export function basicFetch(tag, setter){
    fetch(tag)
    .then((resp) => resp.json())
    .then(data => setter(data))
}

export function handleSearches(searchTerm, arr, setter) {
    console.log(searchTerm)
    const searchedItems = arr.filter((item) => item.name.toLowerCase().startsWith(searchTerm.toLowerCase()));
    setter(searchedItems)
    console.log(searchedItems)
}

export function handleFilterChange (selectedProperties, propertySetter, arr, searchSetter) {
    console.log(arr)
    propertySetter(selectedProperties)
    if (selectedProperties.length === 0) {
        searchSetter(arr);
    } else {
        const filtered = arr.filter((item) => selectedProperties.every((property) =>
            item.properties.some((itemProp) => itemProp.name === property)
        )
        );
        searchSetter(filtered)
        console.log(selectedProperties)
        console.log(filtered)
    }
}

// Form Values and Functions
function optionsArr(arr) {
    const options= arr.map((item) => ({key: item,text: item, value: item, name: item, id:item }))
    return options 
  }

export const herbFormInputs = [
    {dataName: 'name', formName: 'Herb Name', type: 'text'},
    {dataName: 'latin_name', formName: 'Latin Name', type: 'text'},
    {dataName: 'description', formName: 'Description', type: 'text'},
    {dataName: 'warnings', formName: 'Warnings', type: 'text'},
    {dataName: 'image_url', formName: 'Image Link', type: 'text'}
]


export const dosageInputs = (valueKey, changeValue) => {
    const dosageFormInputs = [
    {dataName: 'dosage_description', formName: 'Dosage Description', type: 'text'}]
    const formInputs = dosageFormInputs.map((input) => {
        return (
            <Form.Field key={input.dataName}>
                <label>{input.formName}</label>
                <input 
                    fluid
                    name={input.dataName}
                    value={{valueKey}.dosage_description}
                    onChange={changeValue}
                />
            </Form.Field>
        )
    })
    return formInputs
}

export const dosageDropdowns = (valueKey, changeValue) => {
    const dropdowndata = [
        {dataName: 'dosage_form', formName: 'Dosage Form', options: ['Capsule', 'Capsule or Powder', 'Decoction - Southern','Decoction - Standard','Decoction - Weak', 'Dried', 'Dried Herb', 'Dried or Powdered', 'Dried Seed', 'Essential Oil', 'Extract - Fluid', 'Extract - Solid', 'Extract - Standardized', 'Fresh', 'Fresh Herb', 'Fresh Leaves', 'Fresh or Dried', 'Glycerite', 'Infusion - Cold', 'Infusion - Standard', 'Infusion - Strong', 'Infusion - Weak', 'Infusion - Wine', 'Juice', 'Oil', 'Oil & Salve', 'Powder', 'Syrup', 'Tea', 'Tincture', 'Topical Use']}

        ]
    const formDrops = dropdowndata.map((data) => {
        const options = optionsArr(data.options)
        return (
            <Form.Select 
                fluid
                key= {data.dataName}
                name= {data.dataName}
                value= {valueKey.dataName}
                placeholder= {data.formName}
                options = {options}
                onChange={changeValue}
            />
        )
    })
    return formDrops
}

export const dosageInitialValues = {
    dosage_form: '',
    dosage_description: ''
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
            <Form.Field key={input.dataName}>
                <label>{input.formName}</label>
                <input 
                    fluid
                    name={input.dataName}
                    value={{valueKey}.dosage_description}
                    onChange={changeValue}
                />
            </Form.Field>
        )
    })
    return formInputs
}

export const ingredientsDropdowns = (valueKey, changeValue) => {
    const dropdowndata = [
        {dataName: 'amount_type', formName: 'Amount Type', options: ['Part(s)', 'Cup']},
        {dataName: 'herb_type', formName: 'Herb Type', options: ['Key Herb', 'Supporting Herb', 'Catalyst', 'Optional Catalyst', 'Balancing Herb', 'Optional Balancing Herb']}
        ]
    const formDrops = dropdowndata.map((data) => {
        const options = optionsArr(data.options)
        return (
            <Form.Select 
                fluid
                key= {data.dataName}
                name= {data.dataName}
                placeholder= {data.formName}
                value= {valueKey.dataName}
                options = {options}
                onChange={changeValue}
            />
        )
    })
    return formDrops
}

export const ingredientInitialValues = {
    amount: '',
    amount_type: '',
    herb_type: '',
    herb_id: ''
}
