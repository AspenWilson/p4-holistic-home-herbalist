import React, { useState, useContext } from "react";
import { Button, Grid, Input, Popup } from 'semantic-ui-react';
import { AppContext } from "../../context/AppContext";
import '../../index.css';
import { headers } from "../helpers/GeneralHelpers";
import { StyledTextBox, StyledSelect, FormH3 } from "./StylingHelpers";
import { FormikErrorMsg } from "./FormHelpers";

export const AllFormEdits = ({ label, name, type, formik, itemValue, inputType, options = null, setStatus, setError }) => {
    const { user, checkSession } = useContext(AppContext)
    const [ editState, setEditState] = useState("no edits")

    const handleSubmit = (values, name) => {
        const updatedInfo = {
            [name]: values[name]
        }
        fetch(`/api/users/${user.id}`, {
            method: 'PATCH',
            headers,
            body: JSON.stringify(updatedInfo, null, 2)
        }).then((resp) => {
            if(resp.ok) {
                resp.json().then((data) => {
                    checkSession()
                    setError()
                    setStatus('success')
                })
            } else {
                resp.json().then((err) => {
                    setError(err.message)
                    setEditState('cancelled')
                })
            }
        })
    }
    const handleSave = () => {
        handleSubmit(formik.values, name)
        setEditState("no edits")
    }


    const displayOptions = 
        editState === "no edits" ? formik.values[name] :
        editState === "cancelled" ? itemValue :
        null 
    
    const inputTypeDisplays = 
        inputType === "input" ? 
            <Input
                style={{ overflowWrap: 'break-word', width: '100%' }}
                type={type}
                id={name}
                name={name}
                value={formik.values[name]}
                onChange={formik.handleChange}
            /> :
        inputType === "textarea" ?
            <StyledTextBox
                style = {{ wrapItem: 'true' }}
                id={name}
                as={type}
                name={name}
                value={formik.values[name]}
                onChange={formik.handleChange}
            /> :
        inputType === "select" ?
            <StyledSelect 
                classNamePrefix="Select"
                name={name}
                options={options}
                onChange={(selectedOption) => {
                formik.setFieldValue(name, selectedOption.value)
                }}
            /> :
            null

    return (
        <div style={{  alignItems: 'center' }}>
            <Grid columns={ 3 }>
                <Grid.Column width={ 4 }>
                    <h3  style={{ color: 'black' }}>{ label }</h3>
                </Grid.Column>
                <Grid.Column width={ 9 } >
                    {editState === "edits" ? (
                        <>
                            {inputTypeDisplays}
                            <FormikErrorMsg name={name} formik={formik}/>
                        </>
                    ) : (
                        <FormH3>
                            {displayOptions}
                        </FormH3>
                    )}
                </Grid.Column>
                <Grid.Column width={ 3 }>
                    {editState === "edits" ? (
                        <>
                                <Popup content='Cancel edits' trigger={<Button icon='cancel' style={{ backgroundColor: 'red', color:'white' }} onClick={() => setEditState("cancelled")}  />} />
                                <Popup content='Save changes' trigger={<Button icon='save' style={{ backgroundColor: '#056d52', color:'white' }} onClick={handleSave} />} />
                        </>
                    ) : (
                        <>
                                <Popup content='Edit' trigger={<Button icon='edit' onClick={() => setEditState("edits")}  />} />
                        </>
                    )}
                </Grid.Column>
            </Grid>
        </div>
    )
}
