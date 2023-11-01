import React, { useContext } from "react"
import { Formik, Form, FieldArray } from "formik"
import * as yup from "yup"
import { UserContext } from "../context/AppContext"
import { StyledSelect, FormHeader, StyledTextBox, StyledInput } from "./helpers/StylingHelpers"
import { headers } from "../helpers"
import { Card, Grid, Image, Button } from 'semantic-ui-react'
import { HerbInitialValues, IDDropdowns, dosageDrops, displayErrors } from "./helpers/FormHelpers"

function HerbForm () {
  const { properties, handleModalSuccess, user, refreshEnteredHerbs, refreshHerbs} = useContext(UserContext)
  const imagePlaceholder = "https://i0.wp.com/wingsofchange.us/wp-content/uploads/2021/04/Leaf-placeholder-web-300px.png?fit=300%2C300&ssl=1"

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
      }})
  };
    
  return (
    <Formik 
      initialValues = { HerbInitialValues }
      validationSchema={ formSchema }
      onSubmit = { handleSubmit }
    >
    {(formik) => (
    <div className='container'>
      <Card fluid className='flex-outer'>
        <Form>
          <Card.Content className='allCards' >
            <Grid columns={2}>
              <Grid.Column>
                <FormHeader as='h3'>Herb Name</FormHeader>
                <StyledInput name='name' onChange={formik.handleChange} value={formik.values.name} />
                {displayErrors(formik.errors.name)}

                <FormHeader as='h3'>Latin Name</FormHeader>
                <StyledInput name='latin_name' onChange={formik.handleChange} value={formik.values.latin_name} />
                {displayErrors(formik.errors.latin_name)}
              </Grid.Column>

              <Grid.Column>
                <FormHeader as='h3'>Image Link</FormHeader>
                <StyledInput name='image_url' onChange={formik.handleChange} value={formik.values.image_url} />
                {displayErrors(formik.errors.image_url)}

                <FormHeader as='h3'>Image Preview</FormHeader>
                <Image 
                  size='small'
                  centered
                  src={formik.values.image_url || imagePlaceholder}
                />
              </Grid.Column>
            </Grid>
            <br />
            <Grid columns={2}>
              <Grid.Column>
                <FormHeader as='h3'>Description</FormHeader>
                <StyledTextBox name='description' onChange={formik.handleChange} value={formik.values.description} />
                {displayErrors(formik.errors.description)}
              </Grid.Column>

              <Grid.Column>
                <FormHeader as='h3'>Warnings</FormHeader>
                <StyledTextBox name='warnings' onChange={formik.handleChange} value={formik.values.warnings} />
                {displayErrors(formik.errors.warnings)}
              </Grid.Column>
            </Grid>
            
            <FieldArray name="dosages">
            {({ push, remove }) => (
            <div>
              <FormHeader as='h3'>Add Dosages</FormHeader>
              <br />
              {formik.values.dosages.map((_, index) => (
                <div key={index}>
                  <Grid columns={2}>
                    <Grid.Column>
                      <FormHeader as='h3' >Dosage Description</FormHeader>
                      <StyledInput
                        name={`dosages[${index}].dosage_description`}
                        value={formik.values.dosages.dosage_description}
                        onChange={formik.handleChange}
                      />
                    </Grid.Column>

                    <Grid.Column>
                      <FormHeader as='h3' >Dosage Form</FormHeader>
                      <StyledSelect
                        classNamePrefix="Select"
                        name={`dosages[${index}].dosage_form`}
                        options={dosageDrops}
                        onChange={(selectedOption) => {
                          formik.setFieldValue(`dosages[${index}].dosage_form`, selectedOption.value)
                        }}
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

            <FormHeader as='h3'>Add Properties</FormHeader>
            <br />
            <StyledSelect
              classNamePrefix="Select"
              isMulti
              closeMenuOnSelect={false}
              isClearable={true}
              options={IDDropdowns(properties)}
              onChange={(selectedOptions) => {
                formik.setFieldValue(
                  "property_ids",
                  selectedOptions.map((option) => option.value)
                );
              }}
            />
            {displayErrors(formik.errors.property_ids)}
            <br />
            <Button fluid type='submit' >Submit</Button>
          </Card.Content>
        </Form>
        </Card>
      </div>
      )}
    </Formik>
    )
}

export default HerbForm
