import React, {useContext} from 'react';
import {Label, Popup } from 'semantic-ui-react'
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

export const herbFormInputs = [
    {dataName: 'name', formName: 'Herb Name', type: 'text'},
    {dataName: 'latin_name', formName: 'Latin Name', type: 'text'},
    {dataName: 'description', formName: 'Description', type: 'text'},
    {dataName: 'warnings', formName: 'Warnings', type: 'text'},
    {dataName: 'image_url', formName: 'Image Link', type: 'text'}
]
export const herbInitialValues = {
    name: '', 
    latin_name: '',
    description: '',
    warnings: '',
    image_url: ''
}

export const dosageFormInputs = [
    {dataName: 'dosage_description', formName: 'Dosage Description', type: 'text'}
]

export const dosageDropdowns = [
    {dataName: 'dosage_form', formName: 'Dosage Form', options: ['Capsule', 'Capsule or Powder', 'Decoction - Southern','Decoction - Standard','Decoction - Weak', 'Dried', 'Dried Herb', 'Dried or Powdered', 'Dried Seed', 'Essential Oil', 'Extract - Fluid', 'Extract - Solid', 'Extract - Standardized', 'Fresh', 'Fresh Herb', 'Fresh Leaves', 'Fresh or Dried', 'Glycerite', 'Infusion - Cold', 'Infusion - Standard', 'Infusion - Strong', 'Infusion - Weak', 'Infusion - Wine', 'Juice', 'Oil', 'Oil & Salve', 'Powder', 'Syrup', 'Tea', 'Tincture', 'Topical Use']}
]

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

export const ingredientsFormInputs = [
    {dataName: 'amount', formName: 'Amount',type: 'number'}
]

// export const ingredientDropdowns = [
//     {dataName: 'amount_type', formName: 'Amount Type', options: ['Part(s)', 'Cup']},
//     {dataName: 'herb_type', formName: 'Herb Type', options: ['Key Herb', 'Supporting Herb', 'Catalyst', 'Optional Catalyst', 'Balancing Herb', 'Optional Balancing Herb']},
//     {dataName: 'herb_id', formName: 'Herb', options: herbs.map((herb) => ({ value: herb.herb_id, label: herb.name }))}
// ]

export const ingredientInitialValues = {
    amount: '',
    amount_type: '',
    herb_type: '',
    herb_id: ''
}


// export const herbFormInputs = () => {
//     return (
//         <>
//             <div key='name'>
//             <label>Name</label>
//             <input 
//                 type='text'
//                 name='name'
//                 value={formik.values[input.dataName]}
//                 onChange={formik.handleChange}
//             />
//             </div>
//             <div key={input.dataName}>
//             <label>{input.formName}</label>
//             <input 
//                 type={input.type}
//                 name={input.dataName}
//                 value={formik.values[input.dataName]}
//                 onChange={formik.handleChange}
//             />
//             </div>
//             <div key={input.dataName}>
//             <label>{input.formName}</label>
//             <input 
//                 type={input.type}
//                 name={input.dataName}
//                 value={formik.values[input.dataName]}
//                 onChange={formik.handleChange}
//             />
//             </div>
//             <div key={input.dataName}>
//             <label>{input.formName}</label>
//             <input 
//                 type={input.type}
//                 name={input.dataName}
//                 value={formik.values[input.dataName]}
//                 onChange={formik.handleChange}
//             />
//             </div>
//             <div key={input.dataName}>
//             <label>{input.formName}</label>
//             <input 
//                 type={input.type}
//                 name={input.dataName}
//                 value={formik.values[input.dataName]}
//                 onChange={formik.handleChange}
//             />
//             </div>
//         </>
// )}