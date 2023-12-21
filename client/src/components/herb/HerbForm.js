import React, { useContext, useState } from "react";
import * as yup from "yup";
import { Formik, Form, FieldArray } from "formik";
import { headers } from "../helpers/GeneralHelpers";
import { AppContext } from '../../context/AppContext';
import { FormHeader } from "../helpers/StylingHelpers";
import { Card, Grid, Image, Button } from 'semantic-ui-react';
import { HerbInitialValues, IDDropdowns, dosageDrops, FormInputField, FormTextBoxField, FormSelectField, FormMultiSelectField, displayErrors, SubmitBtn } from "../helpers/FormHelpers";

function HerbForm () {
  const { properties, handleModalSuccess, user, refreshEnteredHerbs, refreshHerbs } = useContext(AppContext)
  const imagePlaceholder = "https://i0.wp.com/wingsofchange.us/wp-content/uploads/2021/04/Leaf-placeholder-web-300px.png?fit=300%2C300&ssl=1"
  const [error, setError] = useState()
  const [selectedProperties, setSelectedProperties] = useState([])

  const formSchema = yup.object().shape({
    name: yup.string().required("Herb name is required."),
    latin_name: yup.string().required("Latin name is required."),
    description: yup.string().required("Herb description is required."),
    warnings: yup.string().required("Herb warnings are required. 'None' is acceptable if herb has no known warnings."),
    image_url: yup.string().required("Image url link is required."),
    dosages: yup.array().of(
      yup.object().shape({
        dosage_form: yup.string().required("Dosage form is required. "),
        dosage_description: yup.string().required("Dosage description is required. Example: 'Dried leaf (1:5, 50% alcohol); 1-4 ml (0.2-0.8 tsp.) 3-4 times daily.'")
      })
    ).min(1, 'At least one dosage is required.'),
    property_ids: yup.array().required("At least one property must be added to your new herb.").min(1, "At least one property must be added to your new herb.")
  })

  const handleSubmit = (values, {resetForm}) => {
    const newHerbValues = {
      name : values.name,
      latin_name : values.latin_name, 
      description : values.description, 
      warnings : values.warnings,
      image_url : values.image_url,
      dosages: values.dosages,
      property_ids : values.property_ids
    }
    fetch('/api/herbs', {
      method: "POST",
      headers,
      body: JSON.stringify(newHerbValues, null, 2)
    })
    .then((resp) => {
      if (resp.ok) {
        resp.json().then(data => {
          handleModalSuccess()
          refreshEnteredHerbs(user)
          refreshHerbs()
          resetForm({ values: HerbInitialValues })
        })
      } else {
        resp.json().then((err) => setError(err.message))
      }
    })
  };
    
  return (
    <Formik 
      initialValues = { HerbInitialValues }
      validationSchema = { formSchema }
      onSubmit = { handleSubmit }
    >
    {(formik) => (
    <div className='container'>
      <Card fluid className='flex-outer'>
        <Form>
        {displayErrors({ error })}
          <Card.Content className='allCards' >
            <Grid columns={ 2 }>
              <Grid.Column>
                <FormInputField 
                  label='Herb Name' 
                  name='name' 
                  type='text' 
                  formik={ formik } 
                />
                <FormInputField 
                  label='Latin Name' 
                  name='latin_name' 
                  type='text' 
                  formik={ formik } 
                />
              </Grid.Column>

              <Grid.Column>
                <FormInputField 
                  label='Image Link' 
                  name='image_url' 
                  type='text' 
                  formik={ formik } 
                />
                <FormHeader as='h3'>Image Preview</FormHeader>
                <Image 
                  size='small'
                  centered
                  src={ formik.values.image_url || imagePlaceholder }
                />
              </Grid.Column>
            </Grid>
            <br />
            <Grid columns={ 2 }>
              <Grid.Column>
                <FormTextBoxField 
                  label='Description' 
                  name='description' 
                  formik={ formik } 
                />
              </Grid.Column>

              <Grid.Column>
                <FormTextBoxField 
                  label='Warnings' 
                  name='warnings' 
                  formik={ formik } 
                /> 
              </Grid.Column>
            </Grid>
            
            <FieldArray name="dosages">
            {({ push, remove }) => (
            <div>
              <FormHeader as='h3'>Add Dosages</FormHeader>
              <br />
              {formik.values.dosages.map((_, index) => (
                <div key={ index }>
                  <Grid columns={ 2 }>
                    <Grid.Column>
                      <FormInputField 
                        label='Dosage Description' 
                        name={`dosages[${index}].dosage_description`} type='text' 
                        formik={ formik } 
                      />
                    </Grid.Column>

                    <Grid.Column>
                      <FormSelectField 
                        label='Doage Form' 
                        name={`dosages[${index}].dosage_form`} 
                        formik={ formik } 
                        options={ dosageDrops } 
                      />
                    </Grid.Column>
                  </Grid>

                  <br />
                  {index > 0 && (
                    <Button onClick={() => remove(index)}>Remove Dosage</Button>
                  )}
                  <br />
                  </div>
                ))}
                <br />
                <Button onClick={() => push({ dosage_form: "", dosage_description: "" })}>
                  Add Dosage
                </Button>
              </div>
            )}
            </FieldArray>
            <FormMultiSelectField 
              label='Add Properties' 
              name='property_ids' 
              formik={ formik } 
              options={ IDDropdowns(properties) }
              setSelectedProperties={setSelectedProperties} selectedProperties={selectedProperties}
            />
            <br />
            <SubmitBtn msg= 'Submit'/>
          </Card.Content>
        </Form>
        </Card>
      </div>
      )}
    </Formik>
    )
}

export default HerbForm
