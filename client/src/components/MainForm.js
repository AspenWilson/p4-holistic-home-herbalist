import React, {useState, useContext} from 'react'
import styled from 'styled-components'
import { useHistory } from 'react-router-dom'
import { Form } from 'semantic-ui-react'
import { useFormik } from "formik"
import * as yup from "yup"
import { herbFormInputs, dosageFormInputs, dosageDropdowns, recipeFormInputs, ingredientsFormInputs, ingredientDropdowns, herbInitialValues, recipeInitialValues } from '../helpers'

function NewForm({newHerb}){
    const history = useHistory()
    const formSchema = newHerb
        ? yup.object().shape({
            name: yup.string().required("Must enter a name"),
            latin_name: yup.string().required("Must enter a latin name"),
            description: yup.string().required("Must enter a description"),
            warnings: yup.string().required(),
            image_url: yup.string().required(),
        })
        : yup.object().shape({
            name: yup.string().required("Must enter a name"),
            directions: yup.string().required("Must enter directions")
        })

    const initialValues = newHerb
        ? herbInitialValues
        : recipeInitialValues
  
    const formik = useFormik({
      initialValues: {initialValues},
      validationSchema: formSchema,
      onSubmit: (values) => {
    //     fetch("/productions", {
    //       method: "POST",
    //       headers: {
    //         "Content-Type": "application/json",
    //       },
    //       body: JSON.stringify(values, null, 2),
    //     }).then((res) => {
    //       if(res.ok) {
    //         res.json().then(production => {
    //           addProduction(production)
    //           history.push(`/productions/${production.id}`)
    //         })
    //       }
    //     })
    //   },
        console.log(values)
      }
    })

    const formInputs = newHerb
        ? herbFormInputs.map((input) => {
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
        : recipeFormInputs.map((input) => {
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
    return (
        <div>
        <Form onSubmit={formik.handleSubmit}>
          {formInputs}
          <input type='submit' />
        </Form> 
        </div>
      )
}

export default NewForm

// const Form = styled.form`
// display:flex;
// flex-direction:column;
// width: 400px;
// margin:auto;
// font-family:Arial;
// font-size:30px;
// input[type=submit]{
//   background-color:#42ddf5;
//   color: white;
//   height:40px;
//   font-family:Arial;
//   font-size:30px;
//   margin-top:10px;
//   margin-bottom:10px;
// }
// `