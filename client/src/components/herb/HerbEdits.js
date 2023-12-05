import React, { useContext, useEffect, useState } from "react"
import {  Formik, Form, FieldArray, Field } from "formik"
import * as yup from "yup"
import { AppContext } from "../../context/AppContext"
import { Card, Grid, Image, Icon, Button, Divider, Modal } from 'semantic-ui-react'
import { PropertyEditCards, AllFormEdits, DosageAdditions, DosageChanges } from "./HerbEditHelpers"
import { FormHeader } from "../helpers/StylingHelpers"
import { IDDropdowns, FormMultiSelectField} from "../helpers/FormHelpers"
import { headers, basicFetch, dividerBreaks } from "../helpers/GeneralHelpers"
import '../../index.css'


function HerbEdits ({ id }) {
    const { properties, user, refreshEnteredHerbs, refreshHerbs } = useContext(AppContext)
    const [herb, setHerb] = useState(null)
    const [dosages, setDosages] = useState([])
    const [deletedProperties, setDeletedProperties] = useState([])
    const [show, setShow] = useState(false)
    const [open, setOpen] = useState(false)

    useEffect(() => {
        basicFetch(`/api/herbs/${id}`, setHerb)
        basicFetch(`/api/herbs/${id}/dosages`, setDosages)
    }, [id])

    const SuccessModal = () => {
        return (
            <Modal
              onClose={() => setOpen(false)}
              open={open}
            >
              <Modal.Header>Success!</Modal.Header>
            </Modal>
        )
    }

    const formSchema = yup.object().shape({
        name: yup.string().required("Herb name is required."),
        latin_name: yup.string().required("Latin name is required."),
        description: yup.string().required("Herb description is required."),
        warnings: yup.string().required("Herb warnings are required. 'None' is acceptable if herb has no known warnings."),
        image_url: yup.string().required("Image url link is required."),
        property_ids: yup.array().required("At least one property must be added to your herb.").min(1, "At least one property must be added to your herb.")
    })

    const dosageSchema = yup.object().shape({
        dosage_form: yup.string(),
        dosage_description: yup.string()
    })

    const successFunctions = (user) => {
        basicFetch(`/api/herbs/${id}`, setHerb)
        basicFetch(`/api/herbs/${id}/dosages`, setDosages)
        refreshEnteredHerbs(user)
        refreshHerbs()
        SuccessModal()
    }

    const PatchRequest = (values, name) => {
        const updatedInfo = {
            [name]:values[name]
        }
        console.log('patch: ', updatedInfo, 'name: ', name)
        fetch(`api/herbs/${id}`, {
            method: 'PATCH', 
            headers, 
            body: JSON.stringify(updatedInfo, null, 2)
        }).then((resp) => {
            if (resp.ok) {
                resp.json().then((data) => {
                    successFunctions(user)
                })
            }
        })
    }
    const handlePropertiesSubmit = (values) => {
        const propertyIdsToRemove = deletedProperties.map((property) => property.id);
        const updatedProperties = values.property_ids.filter((propertyID)=> !propertyIdsToRemove.includes(propertyID))

        const updatedInfo={
            property_ids: updatedProperties
        }
        console.log(updatedInfo)
        fetch(`api/herbs/${id}`, {
            method: 'PATCH', 
            headers, 
            body: JSON.stringify(updatedInfo, null, 2)
        }).then((resp) => {
            if (resp.ok) {
                resp.json().then((data) => {
                    successFunctions(user)
                })
            }
        })
    }

    const DeleteRequest = ({dosage}) => {
        console.log({dosage})
        fetch(`/api/herbs/${id}/dosages/${dosage.id}`, {
            method: 'DELETE'
        }).then(() => {
            successFunctions(user)
        })
    }

    const DosageChangeRequest = ({ values, type , dosageId= null}) => {
        const newDosage = {
            dosage_form: values.dosage_form,
            dosage_description: values.dosage_description
        }
        console.log(newDosage, type, 'dosage id: ', dosageId)
        fetch(type === 'post' ? `api/herbs/${id}/dosages` : `api/herbs/${id}/dosages/${dosageId}`, {
            method: type === 'post' ? 'POST': 'PATCH', 
            headers, 
            body: JSON.stringify(newDosage, null, 2)
        }).then((resp) => {
            if (resp.ok) {
                resp.json().then(() => {
                    successFunctions(user)
                })
            }
        })
    }

    const showFalse = () => {
        setShow(false)}
    const showTrue = () => {
        setShow(true)}

    if (!herb) {
        return <div>Loading...</div>
    }

    return (
        <>
        <Formik
            initialValues={{
                name: herb.name || "",
                latin_name: herb.latin_name || "",
                description: herb.description || "",
                warnings: herb.warnings || "",
                image_url: herb.image_url || "",
                property_ids: herb.properties.map((property) => property.id) || []
            }}
            enableReinitialize = { true }
            validationSchema={ formSchema }
        >
        {(formik) => (
            <Card fluid>
                <Form>
                    <Card.Content style={{ padding: '15px'}}>
                        <Grid columns={ 2 }>
                            <Grid.Column width={9}>
                                <br />
                            <AllFormEdits  
                                itemValue={herb.name}
                                name='name' 
                                type='text'
                                inputType='input' 
                                formik={ formik } 
                                label='Herb Name:'
                                handleFieldSubmit={(values) => PatchRequest(values, 'name')}
                            />
                            <br />
                            <AllFormEdits  
                                itemValue={herb.latin_name}
                                name='latin_name' 
                                type='text' 
                                inputType='input'
                                formik={ formik } 
                                label='Latin Name:'
                                handleFieldSubmit={(values) => PatchRequest(values, 'latin_name')}
                            />
                            <AllFormEdits  
                                    itemValue={herb.image_url}
                                    name='image_url' 
                                    type='textarea' 
                                    inputType='textarea'
                                    formik={ formik } 
                                    label='Image Link:'
                                    handleFieldSubmit={(values) => PatchRequest(values, 'image_url')}
                                />
                            </Grid.Column>
                            <Grid.Column width={6}>
                                <FormHeader as='h3' textAlign='center'>Current Image</FormHeader>
                                <Image 
                                    size='medium'
                                    centered
                                    src={formik.values.image_url}
                                />
                            </Grid.Column>
                        </Grid>
                            {dividerBreaks}
                            <AllFormEdits  
                                itemValue={herb.description}
                                name='description' 
                                type='textarea' 
                                inputType='textarea'
                                formik={ formik } 
                                label='Description:'
                                handleFieldSubmit={(values) => PatchRequest(values, 'description')}
                            />
                            <AllFormEdits  
                                itemValue={herb.warnings}
                                name='warnings' 
                                type='textarea' 
                                inputType='textarea'
                                formik={ formik } 
                                label='Warnings:'
                                handleFieldSubmit={(values) => PatchRequest(values, 'warnings')}
                            />
                            {dividerBreaks}
                        <FieldArray name='property_ids'>
                            <div>
                                <Grid columns={2}>
                                    <Grid.Column>
                                        <FormHeader as='h3'>Existing Properties</FormHeader>
                                            <Card.Group>
                                                {herb.properties.map((property) => {
                                                    return (
                                                        <PropertyEditCards property={ property } deletedProperties={ deletedProperties } setDeletedProperties={ setDeletedProperties } />
                                                        )
                                                    })}
                                            </Card.Group>
                                    </Grid.Column>
                                    <Grid.Column>
                                        <FormMultiSelectField label='Add Properties' name='property_ids' formik={ formik } options={ IDDropdowns(properties) } />
                                        <br/>
                                        <Button icon='save' onClick={(values) => handlePropertiesSubmit(values)}>Save property changes</Button>
                                    </Grid.Column>
                                </Grid>
                            </div>
                        </FieldArray>
                    </Card.Content>
                </Form>
            </Card>
        )}
        </Formik>
        <Card fluid>
                <Card.Content style={{ padding: '15px'}}>
                    <FormHeader as='h3'>Existing Dosages</FormHeader>
                    {dividerBreaks}
                    {dosages.length > 0 ? 
                        <>
                        {dosages.map((dosage) => (
                            <Formik 
                                key={dosage.id}
                                initialValues={{
                                    dosage_form: dosage.dosage_form ,
                                    dosage_description: dosage.dosage_description
                                }}
                                enableReinitialize= { true }
                                validationSchema={ dosageSchema }
                            >
                            {(formik) => (
                                <Form>
                                    <DosageChanges 
                                        dosage={dosage} 
                                        type='textarea' 
                                        formik={formik} 
                                        handleFieldSubmit={(values)=> DosageChangeRequest({values, type:'patch', dosageId: dosage.id})} 
                                        handleDelete={({dosage}) => DeleteRequest({dosage})} 
                                    />
                                    {dividerBreaks}
                                </Form>
                            )}
                            </Formik>
                        ))}
                        </> : 
                            <h3 className='allCards'>No dosages have been entered.</h3>
                    }

                        <Formik 
                            initialValues={{
                                dosage_form: "", 
                                dosage_description: ""
                            }}
                            enableReinitialize={true}
                            validationSchema={dosageSchema}
                        >
                            {(formik) => (
                                <Form>
                                {show === false ? 
                                    <Button onClick={showTrue} fluid>
                                   Add new dosages to this herb <Icon name='add' />
                                    </Button> : 
                                    <DosageAdditions 
                                        formik={ formik }
                                        handleSubmit={ (values) => DosageChangeRequest({values, type:'post'})} 
                                        showFalse={showFalse} 
                                        showTrue={showTrue}
                                    />
                                }
                                </Form>
                            )}
                        </Formik>                   
                </Card.Content>     
            </Card>
        </>
    )
}


export default HerbEdits
