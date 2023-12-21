import React, { useContext, useEffect, useState } from "react";
import {  Formik, Form } from "formik";
import * as yup from "yup";
import { Card, Grid, Image, Button } from 'semantic-ui-react';
import { AppContext } from "../../context/AppContext";
import '../../index.css';
import DosageChanges  from "./DosageChanges";
import DosageAdditions from "./DosageAdditions";
import SuccessModal from "../modals/SuccessModal";
import { FormHeader } from "../helpers/StylingHelpers";
import { PropertyEditCards, AllFormEdits } from "./HerbEditHelpers";
import { headers, basicFetch, dividerBreaks } from "../helpers/GeneralHelpers"
import { IDDropdowns, FormMultiSelectField, displayErrors} from "../helpers/FormHelpers";


function HerbEdits ({ id }) {
    const { properties, user, refreshEnteredHerbs, refreshHerbs } = useContext(AppContext)
    const [selectedProperties, setSelectedProperties] = useState([])
    const [deletedProperties, setDeletedProperties] = useState([])
    const [statusIs, setStatus] = useState(null)
    const [dosages, setDosages] = useState([])
    const [show, setShow] = useState(false)
    const [herb, setHerb] = useState(null)
    const [error, setError] = useState()

    useEffect(() => {
        basicFetch(`/api/herbs/${id}`, setHerb)
        basicFetch(`/api/herbs/${id}/dosages`, setDosages)
    }, [id])

    const formSchema = yup.object().shape({
        name: yup.string().required("Herb name is required."),
        latin_name: yup.string().required("Latin name is required."),
        description: yup.string().required("Herb description is required."),
        warnings: yup.string().required("Herb warnings are required. 'None' is acceptable if herb has no known warnings."),
        image_url: yup.string().required("Image url link is required."),
        property_ids: yup.array().required("At least one property must be added to your herb.").min(1, "At least one property must be added to your herb.")
    })

    const dosageSchema = yup.object().shape({
        dosage_form: yup.string().required('Dosage form is required.'),
        dosage_description: yup.string().required('Dosage description is required.'), 
    })

    const successFunctions = (user) => {
        basicFetch(`/api/herbs/${id}`, setHerb)
        basicFetch(`/api/herbs/${id}/dosages`, setDosages)
        refreshEnteredHerbs(user)
        refreshHerbs()
        setStatus('success')
        setError()
    }

    const PatchRequest = (values, name) => {
        const updatedInfo = {
            [name]:values[name]
        }
        fetch(`api/herbs/${id}`, {
            method: 'PATCH', 
            headers, 
            body: JSON.stringify(updatedInfo, null, 2)
        }).then((resp) => {
            if (resp.ok) {
                resp.json().then((data) => {
                    successFunctions(user)
                })
            } else {
                resp.json().then((err) =>{ 
                    setError(err.message)
                    setStatus('cancelled')
                })
            }
        })
    }

    const handlePropertiesSubmit = () => {
        const property_ids = herb.properties.map((property) => property.id)
        const updatedProperties = property_ids.filter((propertyID)=> !deletedProperties.includes(propertyID))
        const finalList = [...updatedProperties, ...selectedProperties]

        const updatedInfo={
            property_ids: finalList
        }
        fetch(`api/herbs/${id}`, {
            method: 'PATCH', 
            headers, 
            body: JSON.stringify(updatedInfo, null, 2)
        }).then((resp) => {
            if (resp.ok) {
                resp.json().then((data) => {
                    successFunctions(user)
                })
            } else {
                resp.json().then((err) => setError(err.message))
            }
        })
    }

    const DeleteRequest = ({dosage}) => {
        fetch(`/api/herbs/${id}/dosages/${dosage.id}`, {
            method: 'DELETE'
        }).then(() => {
            successFunctions(user)
        })
    }

    const showFalse = () => { setShow(false) }
    const showTrue = () => { setShow(true) }

    if (!herb) {
        return <div>Loading...</div>
    }

    return (
        <div className='container'>
            <Card fluid className='flex-outer'>
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
                    <Form>
                        <Card.Content style={{ padding: '15px'}}>
                        {displayErrors({ error })}
                            <Grid columns={ 2 }>
                                <Grid.Column width={ 9 }>
                                    <br />
                                    <AllFormEdits  
                                        itemValue={herb.name}
                                        name='name' 
                                        type='text'
                                        inputType='input' 
                                        formik={ formik } 
                                        label='Herb Name:'
                                        handleFieldSubmit={(values) => PatchRequest(values, 'name')}
                                        statusIs={statusIs}
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
                                        statusIs={statusIs}
                                    />
                                    <AllFormEdits  
                                            itemValue={herb.image_url}
                                            name='image_url' 
                                            type='textarea' 
                                            inputType='textarea'
                                            formik={ formik } 
                                            label='Image Link:'
                                            handleFieldSubmit={(values) => PatchRequest(values, 'image_url')}
                                            statusIs={statusIs}
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
                            <SuccessModal statusIs={statusIs} setStatus={setStatus} />
                            {dividerBreaks()}
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
                            {dividerBreaks()}
                            <div>
                                <Grid columns={2}>
                                    <Grid.Column>
                                        <FormHeader as='h3'>Existing Properties</FormHeader>
                                        <Card.Group>
                                            {herb.properties.map((property) => {
                                                return (
                                                    <PropertyEditCards key={property.id} property={ property } deletedProperties={ deletedProperties } setDeletedProperties={ setDeletedProperties } />
                                                )
                                            })}
                                        </Card.Group>
                                    </Grid.Column>
                                    <Grid.Column>
                                        <FormMultiSelectField 
                                            label='Add Properties' 
                                            name='property_ids' 
                                            formik={ formik } 
                                            error={ error }
                                            options={ IDDropdowns(properties) }
                                            selectedProperties = {selectedProperties}
                                            setSelectedProperties = {setSelectedProperties}
                                        />
                                        <br/>
                                        <Button icon='save' onClick={(values) =>handlePropertiesSubmit({values})}>Save property changes</Button>
                                    </Grid.Column>
                                </Grid>
                            </div>
                        </Card.Content>
                    </Form>
                )}
                </Formik>
                <Card.Content style={{ padding: '15px'}}>
                    <FormHeader as='h3'>Existing Dosages</FormHeader>
                    {dividerBreaks()}
                    {dosages.length > 0 ? 
                        <>
                        <Card.Group itemsPerRow={2} style={{ padding: '20px'}}>
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
                                    <DosageChanges 
                                        dosage={dosage} 
                                        formik={formik} 
                                        id={id}
                                        setError= {setError}
                                        successFunctions={successFunctions}
                                        handleDelete={({dosage}) => DeleteRequest({dosage})} 
                                    />
                                )}
                                </Formik>
                            ))}
                        </Card.Group>
                        </> : 
                            <h3 className='allCards'>No dosages have been entered.</h3>
                    }
                    {dividerBreaks()}
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
                                    <Button icon='add' onClick={showTrue} fluid>
                                        Add new dosages to this herb
                                    </Button> : 
                                    <DosageAdditions 
                                        formik={ formik }
                                        showFalse={showFalse} 
                                        showTrue={showTrue}
                                        setError= {setError}
                                        id={id}
                                        successFunctions={successFunctions}

                                    />
                                }
                            </Form>
                        )}
                        </Formik>                   
                </Card.Content>     
            </Card>
        </div>
    )
}


export default HerbEdits
