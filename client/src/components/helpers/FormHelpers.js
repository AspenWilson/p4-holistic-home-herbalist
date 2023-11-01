import React from 'react'

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

// Error Messages

export const displayErrors = (error) => {
    return error ? <p style={{ color: "red" }}>{ error }</p> : null
}

