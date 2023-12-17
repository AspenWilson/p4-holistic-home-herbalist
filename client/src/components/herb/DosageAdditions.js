import React, { useState, useContext } from "react"
import { Button, Grid, Popup } from 'semantic-ui-react'
import { StyledTextBox, StyledSelect } from "../helpers/StylingHelpers"
import { dosageDrops } from "../helpers/FormHelpers"
import { dividerBreaks, headers } from "../helpers/GeneralHelpers"
import { AppContext } from "../../context/AppContext"

import '../../index.css'

export const DosageAdditions = ({ formik, showFalse, setError, id, successFunctions }) => {
    const { user } = useContext(AppContext)
    const [inputFields, setInputFields] = useState([
        {dosage_form: '', dosage_description: ''}
     ])

     const addFields = () => {
        let newField = {dosage_form: '', dosage_description: ''}
        setInputFields([...inputFields, newField])
     }

     const removeFields = (index) => {
        let data = [...inputFields]
        if (data.length > 1) { 
            data.splice(index,1)
            setInputFields(data) 
        } else {
            showFalse()
        }
     }
     const DosageAdd = (values) => {
        const newDosage = {
            dosage_form: values.dosage_form,
            dosage_description: values.dosage_description, 
        }
        fetch(`api/herbs/${id}/dosages`, {
            method:'POST', 
            headers, 
            body: JSON.stringify(newDosage, null, 2)
        }).then((resp) => {
            if (resp.ok) {
                resp.json().then(() => {
                    successFunctions(user)
                })
            } else {
                resp.json().then(err => {
                    setError(err.message)
                })
            }
        })
    }

     const handleSave = (index) => {
        DosageAdd(formik.values)
        removeFields(index)
     }
    return (
        <>
        {inputFields.map((_, index) => {
            return (
                <div key={index}>
                    <Grid columns={3}>
                        <Grid.Column width={4}>
                            <h3  style={{ color: 'black' }}>Form:</h3> 
                            <br/>
                            <StyledSelect 
                                classNamePrefix="Select"
                                name='dosage_form'
                                options={dosageDrops}
                                placeholder='Select dosage form...'
                                onChange={(selectedOption) => {
                                    formik.setFieldValue('dosage_form', selectedOption.value)
                                }}
                            />
                            {formik.touched['dosage_form'] && formik.errors['dosage_form'] && (
                                <div style={{ color: "red" }}>{formik.errors['dosage_form']}</div>
                            )}
                        </Grid.Column>
                        <Grid.Column width={9}>
                            <h3  style={{ color: 'black' }}>Description:</h3>
                            <br/>
                            <StyledTextBox
                                style = {{ wrapItem: 'true' }}
                                as='textarea'
                                name='dosage_description'
                                placeholder='Enter a dosage description...'
                                value={formik.values['dosage_description']}
                                onChange={formik.handleChange}
                            />
                            {formik.touched['dosage_description'] && formik.errors['dosage_description'] && (
                                <div style={{ color: "red" }}>{formik.errors['dosage_description']}</div>
                            )}
                        </Grid.Column>
                        <Grid.Column width={3}>
                            <br />
                            <Popup content='Save changes' trigger={<Button icon='save' fluid  style={{ backgroundColor: '#056d52', color:'white' }} onClick={handleSave} />} />
                            <br/>
                            <Popup content='Delete new addition' trigger={<Button icon='cancel' fluid style={{ backgroundColor: 'red', color:'white' }} onClick={ () => removeFields()} /> } />
                        </Grid.Column>
                    </Grid>
                </div>
            )
        })}
            {dividerBreaks}
            <Button icon='plus' fluid onClick={addFields}>Add more</Button>
    </>
    )
}