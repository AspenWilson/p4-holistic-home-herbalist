import React, { useState } from "react";
import { Button, Grid, Input, Popup } from 'semantic-ui-react';
import '../../index.css';
import { FormikErrorMsg } from "../helpers/FormHelpers";
import { StyledTextBox, StyledSelect, FormH3 } from "../helpers/StylingHelpers";

export const AllFormEdits = ({ label, name, type, formik, itemValue, handleFieldSubmit, inputType, options = null, statusIs }) => {
    const [editState, setEditState] = useState("no edits")

    const handleSave = () => {
        handleFieldSubmit(formik.values)
        setEditState("no edits")
    }

    const displayOptions = 
        statusIs === "cancelled" ? itemValue : formik.values[name]
    
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
                        <FormH3 > { displayOptions } </FormH3>
                    )}
                </Grid.Column>
                <Grid.Column width={ 3 }>
                    {editState === "edits" ? (
                        <>
                            <Popup content='Cancel edits' trigger={<Button icon='cancel' style={{ backgroundColor: 'red', color:'white' }} onClick={() => setEditState("cancelled")} />} />
                            <Popup content='Save changes' trigger={<Button icon='save' style={{ backgroundColor: '#056d52', color:'white' }} onClick={handleSave} />} />

                        </>
                    ) : (
                        <>
                            <Popup content='Edit' trigger={<Button icon='edit' onClick={() => setEditState("edits")} />} />
                        </>
                    )}
                </Grid.Column>
            </Grid>
        </div>
    )
}

