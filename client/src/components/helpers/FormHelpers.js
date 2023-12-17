import React from 'react'
import { StyledInput, FormHeader, StyledTextBox, StyledSelect } from './StylingHelpers'

// Initial Values

// ---> Herbs

export const HerbInitialValues = {
    name:"", 
    latin_name:"",
    description:"",
    warnings:"",
    image_url:"",
    dosages: [{
            dosage_form:"",
            dosage_description:""
    }],
    property_ids: []
}

// ---> Recipes

export const RecipeInitialValues = {
    name: "", 
    directions: "", 
    ingredients: [{
        amount: "", 
        amount_type: "", 
        herb_type: "", 
        herb_id: ""
    }]
}

// ---> Comments

export const CommentInitalValues = {
    comment: ""
  }

//Dropdown values

// ---> Option lists

const options = ['Capsule', 'Capsule or Powder', 'Decoction - Southern','Decoction - Standard','Decoction - Weak', 'Dried', 'Dried Herb', 'Dried or Powdered', 'Dried Seed', 'Essential Oil', 'Extract - Fluid', 'Extract - Solid', 'Extract - Standardized', 'Fresh', 'Fresh Herb', 'Fresh Leaves', 'Fresh or Dried', 'Glycerite', 'Infusion - Cold', 'Infusion - Standard', 'Infusion - Strong', 'Infusion - Weak', 'Infusion - Wine', 'Juice', 'Oil', 'Oil & Salve', 'Powder', 'Syrup', 'Tea', 'Tincture', 'Topical Use']

const amountTypeOptions = ['Part(s)', 'Cup']

const herbTypeOptions = ['Key Herb', 'Supporting Herb', 'Catalyst', 'Optional Catalyst', 'Balancing Herb', 'Optional Balancing Herb']

const topicalOptions = ['Butters', 'Compresses and Soaks','Liniments', 'Lotions', 'Massage Oils', 'Oil Extractions']

// ---> DRY Function

const dropdowns = (arr) => {
    return arr.map((item) => ({
        value: item,
        label: item
    }))
}

export const IDDropdowns = (arr) => {
    return arr.map((item) => ({
        value: item.id,
        label: item.name
    }))
}

// ---> Exported Dropdown values


export const dosageDrops = dropdowns(options)

export const amountTypeDrops = dropdowns(amountTypeOptions)

export const herbTypeDrops = dropdowns(herbTypeOptions)

export const topicalDrops = dropdowns(topicalOptions)

// Error Messages

export const displayErrors = ({ error }) => {
    return error ? <p style={{ color: "red" }}>{ error }</p> : null
}

// Form Fields

export const FormInputField = ({ label, name, type, formik }) => {
    return (
        <>
        <FormHeader as='h3'>{label}</FormHeader>
        <StyledInput
            type={type}
            id={name}
            name={name}
            value={formik.values[name]}
            onChange={formik.handleChange}
        />
        {formik.touched[name] && formik.errors[name] && (
        <div style={{ color: "red" }}>{formik.errors[name]}</div>
        )}
        </>
    )
}

export const FormTextBoxField = ({ label, name, formik }) => {
    return (
        <>
        <FormHeader as='h3'>{label}</FormHeader>
        <StyledTextBox
            name={name}
            id={name}
            value={formik.values[name]}
            onChange={formik.handleChange}
        />
        {formik.touched[name] && formik.errors[name] && (
        <div style={{ color: "red" }}>{formik.errors[name]}</div> )}
        </>
    )
}

export const FormSelectField = ({ label, name, formik, options }) => {
    return (
    <>
    <FormHeader as='h3'>{label}</FormHeader>
    <StyledSelect 
        classNamePrefix="Select"
        name={ name }
        options={ options }
        onChange={(selectedOption) => {
            formik.setFieldValue(name, selectedOption.value)
        }}
        />
        {formik.touched[name] && formik.errors[name] && (
        <div style={{ color: "red" }}>{formik.errors[name]}</div> )}
    </>
    )
}

export const FormMultiSelectField = ({ label, name, formik, options, setSelectedProperties }) => {
    return (
        <>
        <FormHeader as='h3'>{label}</FormHeader>
        <StyledSelect 
            classNamePrefix="Select"
            isClearable = { true }
            isMulti = { true }
            closeMenuOnSelect={ false }
            name={ name }
            options={ options }
            onChange={(selectedOptions) => {
                formik.setFieldValue(name, selectedOptions.map((option) => option.value))
                setSelectedProperties(selectedOptions.map((option) => option.value))
            }}
            />
            {formik.touched[name] && formik.errors[name] && (
        <div style={{ color: "red" }}>{formik.errors[name]}</div> )}
        </>
    )
}

