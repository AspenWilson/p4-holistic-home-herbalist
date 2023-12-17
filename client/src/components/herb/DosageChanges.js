import React, { useState, useContext } from "react"
import { Button, Card, Grid, Popup } from 'semantic-ui-react'
import { StyledTextBox, StyledSelect, FormH3 } from "../helpers/StylingHelpers"
import { dosageDrops } from "../helpers/FormHelpers"
import { headers } from "../helpers/GeneralHelpers"
import { AppContext } from "../../context/AppContext"

import '../../index.css'

export const DosageChanges = ({ dosage, type, formik, handleDelete, id, successFunctions, setError }) => {
    const {user} = useContext(AppContext)
    const [editState, setEditState] = useState("no edits")

    const handlePatch = (values) => {
        const updatedDosage = {
            dosage_form: values.dosage_form,
            dosage_description: values.dosage_description
        }
        fetch(`api/herbs/${id}/dosages/${dosage.id}`, {
            method:'PATCH', 
            headers, 
            body: JSON.stringify(updatedDosage, null, 2)
        }).then((resp) => {
            if (resp.ok) {
                resp.json().then(() => {
                    successFunctions(user)
                })
            } else {
                resp.json().then(err => {
                    setError(err.message)
                    setEditState('cancelled')
                })
            }
        })
    }
    const handleSave = () => {
        handlePatch(formik.values)
        setEditState("no edits")
    }

    return (
        <Card style={{ padding: '10px' }} fluid>
            <Grid columns = {2}>
                <Grid.Column >
                    <h3  style={{ color: 'black' }}>Form:</h3> 
                        {editState === "edits" ? (
                            <>
                                <StyledSelect 
                                    classNamePrefix="Select"
                                    name='dosage_form'
                                    options={dosageDrops}
                                    placeholder={editState === 'cancelled'? dosage.dosage_form : formik.values['dosage_form']}
                                    onChange={(selectedOption) => {
                                    formik.setFieldValue('dosage_form', selectedOption.value)
                                    }}
                                />
                                {formik.touched['dosage_form'] && formik.errors['dosage_form'] && (
                                <div style={{ color: "red" }}>{formik.errors['dosage_form']}</div>
                                )}
                            </>
                        ) : (
                            <FormH3>{formik.values['dosage_form']}</FormH3>
                        )}
                </Grid.Column>
                <Grid.Column >
                    <h3  style={{ color: 'black' }}>Description:</h3>
                        {editState === "edits" ? (
                            <>
                                <StyledTextBox
                                    style = {{ wrapItem: 'true' }}
                                    as={type}
                                    name='dosage_description'
                                    value={editState === 'cancelled' ? dosage.dosage_description : formik.values['dosage_description']}
                                    onChange={formik.handleChange}
                                />
                                {formik.touched['dosage_description'] && formik.errors['dosage_description'] && (
                                <div style={{ color: "red" }}>{formik.errors['dosage_description']}</div>
                                )} 
                            </>
                        ) : (
                            <FormH3>{formik.values['dosage_description']}</FormH3>
                        )}
                </Grid.Column>
            </Grid>
            <Grid columns={2}>
                {editState === "edits" ? (
                    <>
                        <Grid.Column>
                            <Popup content='Cancel edits' trigger={<Button icon='cancel' fluid style={{ backgroundColor: 'red', color:'white' }} onClick={() => setEditState("cancelled")}  />} />
                        </Grid.Column>
                        <Grid.Column>
                            <Popup content='Save changes' trigger={<Button icon='save' fluid style={{ backgroundColor: '#056d52', color:'white' }} onClick={handleSave} />} />
                        </Grid.Column>
                    </>
                ) : (
                    <>
                        <Grid.Column>
                            <Button icon='edit' fluid onClick={()=> setEditState("edits")} >Edit</Button>
                        </Grid.Column>
                        <Grid.Column>
                            <Button icon='trash' fluid style={{ backgroundColor: 'red', color:'white' }} onClick={() => handleDelete({ dosage })} >Delete</Button>
                        </Grid.Column>
                    </>
                )}
            </Grid>
        </Card>
    )
}