import React, { useContext, useEffect, useState } from "react"
import {  Formik, Form, FieldArray } from "formik"
import * as yup from "yup"
import { AppContext } from "../context/AppContext"
import { Card, Grid, Image, Icon, Button } from 'semantic-ui-react'
import { DosageEditCards, PropertyEditCards } from "./helpers/EditFormHelpers"
import { FormHeader } from "./helpers/StylingHelpers"
import { IDDropdowns, dosageDrops, FormInputField, FormTextBoxField, FormMultiSelectField, FormSelectField } from "./helpers/FormHelpers"
import { headers } from "./helpers/GeneralHelpers"


function HerbEdits ({ id }) {
    const { properties, handleModalSuccess, user, refreshEnteredHerbs, refreshHerbs } = useContext(AppContext)
    const [herb, setHerb] = useState(null)
    const [deletedDosages, setDeletedDosages] = useState([])
    const [deletedProperties, setDeletedProperties] = useState([])
    const [show, setShow] = useState(null)

    useEffect(() => {
        fetch(`/api/herbs/${id}`)
          .then((resp) => resp.json())
          .then((data) => {
            setHerb(data);
          })
      }, [id]);
    
      const formSchema = yup.object().shape({
        name: yup.string().required("Herb name is required."),
        latin_name: yup.string().required("Latin name is required."),
        description: yup.string().required("Herb description is required."),
        warnings: yup.string().required("Herb warnings are required. 'None' is acceptable if herb has no known warnings."),
        image_url: yup.string().required("Image url link is required."),
        dosages: yup.array().of(
            yup.object().shape({
                dosage_form: yup.string(),
                dosage_description: yup.string()
            })
        ),
        property_ids: yup.array().required("At least one property must be added to your new herb.").min(1, "At least one property must be added to your new herb.")
    })

    const handleSubmit = (values) => {
        const propertyIdsToRemove = deletedProperties.map((property) => property.id);
        const updatedProperties = values.property_ids.filter((propertyID)=> !propertyIdsToRemove.includes(propertyID))
        
        const updatedHerb = {
            name: values.name,
            latin_name: values.latin_name,
            description: values.description,
            warnings: values.warnings,
            image_url: values.image_url,
            dosages: values.dosages,
            property_ids: updatedProperties
        }
        fetch(`/api/herbs/${id}`, {
            method: 'PATCH',
            headers,
            body: JSON.stringify(updatedHerb, null, 2)
        }).then((resp) => {
            if(resp.ok) {
                resp.json().then((data) => {
                    if (deletedDosages.length > 0) {
                        deletedDosages.map((dosage) => {
                            fetch(`/api/herbs/${herb.id}/dosages/${dosage.id}`, {
                                method: 'DELETE'
                            })
                        })
                    }
                handleModalSuccess()
                refreshEnteredHerbs(user)
                refreshHerbs()
            })     
        }})
    }

    if (!herb) {
        return <div>Loading...</div>;
    }

    return (
        <Formik 
            initialValues = {{
                name: herb.name || "",
                latin_name: herb.latin_name || "",
                description: herb.description || "",
                warnings: herb.warnings || "",
                image_url: herb.image_url || "",
                dosages: show ? [{ dosage_form: "", dosage_description: "" }] : [],
                property_ids: herb.properties.map((property) => property.id) || []
            }}
            enableReinitialize={ true }
            validationSchema = { formSchema }
            onSubmit = { handleSubmit }
        >
        {(formik) => (
            <div className='container'>
            <Card fluid className='flex-outer'>
                <Form>
                    <Card.Content className='allCards'>
                        <Grid columns={ 2 }>
                            <Grid.Column>
                                <FormInputField label='Herb Name' name='name' type='text' formik={ formik } />
                                <FormInputField label='Latin Name' name='latin_name' type='text' formik={ formik } />
                            </Grid.Column>

                            <Grid.Column>
                                <FormInputField label='Image Link' name='image_url' type='text' formik={ formik } />
                                <FormHeader as='h3' textAlign='center'>Current Image</FormHeader>
                                <Image 
                                    size='small'
                                    centered
                                    src={formik.values.image_url}
                                />
                            </Grid.Column>
                        </Grid>

                        <Grid columns={ 2 }>
                            <Grid.Column>
                                <FormTextBoxField label='Description' name='description' formik={ formik } />
                            </Grid.Column>

                            <Grid.Column>
                                <FormTextBoxField label='Warnings' name='warnings' formik={ formik } />                           
                            </Grid.Column>
                        </Grid>

                        <FormHeader as='h3'>Existing Dosages</FormHeader>
                        <FieldArray name="dosages">
                        {({ push, remove }) => (
                            <div>
                                <Card.Group>
                                    {herb.dosages.map((dosage, index) => {
                                        return (
                                            <DosageEditCards  key={ index } dosage={ dosage } deletedDosages={ deletedDosages } setDeletedDosages={ setDeletedDosages } />
                                        )
                                    })}
                                </Card.Group>
                                
                                {show === true ? formik.values.dosages.map((_, index) =>  {
                                    return (
                                    <div key={ index }>
                                        <FormInputField label='Dosage Description' name={`dosages[${index}].dosage_description`} type='text' formik={ formik } />
                                        <FormSelectField label='Doage Form' name={`dosages[${index}].dosage_form`} formik={formik} options={dosageDrops} />

                                        <Button onClick={() => remove(index)}>
                                            Remove Dosage
                                        </Button>
                                        <br />
                                        <Button onClick={() => {
                                            push({ dosage_form: "", dosage_description: ""})}}
                                        >
                                            Add another dosage <Icon name='add' />
                                        </Button>
                                    </div>
                                )}) : null }

                                {show === null ? <Button onClick={() => setShow(true)}>
                                   Add new dosages to this herb <Icon name='add' />
                                </Button> : null}
                            </div>
                        )}
                        </FieldArray>

                        <FieldArray name='property_ids'>
                            <div>
                                <FormHeader as='h3'>Existing Properties</FormHeader>
                                    <Card.Group>
                                        {herb.properties.map((property) => {
                                            return (
                                                <PropertyEditCards property={ property } deletedProperties={ deletedProperties } setDeletedProperties={ setDeletedProperties } />
                                                )
                                            })}
                                    </Card.Group>
                                    <FormMultiSelectField label='Add Properties' name='property_ids' formik={ formik } options={ IDDropdowns(properties) } />
                            </div>
                        </FieldArray>
                    </Card.Content>
                    <Button fluid type='submit'>Submit edits</Button> 
                </Form>
            </Card>
            </div>
        )}
    </Formik>      
    )
}

export default HerbEdits
