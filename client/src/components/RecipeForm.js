import React, {useContext} from "react"
import { useFormik, Formik, Form, Field, FieldArray, ErrorMessage } from "formik"
import * as yup from "yup"
import { UserContext } from "../context/UserContext"
import Select from 'react-select'


function RecipeForm () {
    const { herbs, handleModalSuccess } = useContext(UserContext)

    const formSchema = yup.object().shape({
        name: yup.string().required("Herb name is required."),
        directions: yup.string().min(50, "Directions must be at least 50 characters.").required("Directions are required."),
        ingredients : yup.array().of(
            yup.object().shape({
                amount: yup.number().required("Ingredient amount is required."),
                amount_type: yup.string().required("Amount type is required."),
                herb_type: yup.string().required("Herb type is required."),
                herb_id: yup.string().required("Herb must be selected.")
            })
        )
    })

    const initialValues = {
        name: "", 
        directions: "", 
        ingredients: [{
            amount: "", 
            amount_type: "", 
            herb_type: "", 
            herb_id: ""
        }]
    }

    const handleSubmit = (values, {resetForm}) => {
        const newRecipe =  {
            name: values.name, 
            directions: values.directions,
            ingredients: values.ingredients
        }
        console.log('Clicked! New recipe: ', newRecipe)
        resetForm({ values: initialValues })
        handleModalSuccess()
    }
    
    const amountTypeOptions = ['Part(s)', 'Cup']

    const herbTypeOptions = ['Key Herb', 'Supporting Herb', 'Catalyst', 'Optional Catalyst', 'Balancing Herb', 'Optional Balancing Herb']

    const herbTypeDrops = herbTypeOptions.map((option) => {
        return (
            <option key={option} value={option}>{option}</option>
        )
    })

    const allHerbsDrops = herbs.map((herb) => ({
        value: herb.id,
        label: herb.name
    }))

    return (
        <Formik 
            initialValues = {initialValues}
            validationSchema={formSchema}
            onSubmit = {handleSubmit}
        >
        {(formik) => (
        <Form>
            <label>Name</label>
            <Field type='text' name='name' onChange={formik.handleChange} value={formik.values.name} />

            <ErrorMessage name="name" />

            <label>Directions</label>
            <Field type='text' name='directions' onChange={formik.handleChange} value={formik.values.directions} />

            <ErrorMessage name="directions" />

            <FieldArray name="ingredients">
            {({ push, remove }) => (
              <div>
                {formik.values.ingredients.map((_, index) => (
                  <div key={index}>
                    <label>Amount</label>
                    <Field
                      type="number"
                      name={`ingredients[${index}].amount`}
                    />
                    <ErrorMessage name={`ingredients[${index}].amount`} />

                    <label>Amount Type</label>
                    <Field
                      as="select"
                      name={`ingredients[${index}].amount_type`}
                    >
                      <option value=""></option>
                      {amountTypeOptions.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </Field>
                    <ErrorMessage name={`ingredients[${index}].amount_type`} />

                    <label>Herb</label>
                    <Select
                      name={`ingredients[${index}].herb_id`}
                      isSearchable
                      isClearable
                      placeholder='Select an herb. Type to search.'
                      options={allHerbsDrops}
                      onChange={(selectedHerb) => {formik.setFieldValue(`ingredients[${index}].herb_id`, selectedHerb.value)}}
                    />
                    <ErrorMessage name={`ingredients[${index}].herb_id`} />

                    <label>Herb Type</label>
                    <Field
                      as="select"
                      name={`ingredients[${index}].herb_type`}
                    >
                      <option value=""></option>
                      {herbTypeOptions.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </Field>
    
                    <ErrorMessage name={`ingredients[${index}].herb_type`} />

                    {index > 0 && (
                      <button type="button" onClick={() => remove(index)}>
                        Remove Ingredient
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => push({ amount: "", amount_type: "", herb_id:"", herb_type:"" })}
                >
                  Add Ingredient
                </button>
              </div>
            )}
            </FieldArray>
            <input type='submit' value='Submit' />
        </Form>
            
        )}
        </Formik>
    )

}

export default RecipeForm