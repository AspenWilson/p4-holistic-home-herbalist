import React, { useState } from "react"
import { Button, Card, Header, Grid, Input, Popup } from 'semantic-ui-react'
import { StyledTextBox, StyledSelect, FormH3 } from "../helpers/StylingHelpers"

import '../../index.css'
    
export function PropertyEditCards ({property, deletedProperties, setDeletedProperties}) {
    const [deleted, setDeleted] = useState(false)
    const id = property.id
    
    const handleDelete = () => {
        const newList = [...deletedProperties, property.id]
        setDeletedProperties(newList)
    }

    return (
        <Card fluid className='property-edits' style={deleted ? { color: "white", background: "red" } : null}>
            <div key={id}>
            {deleted ? <Header textAlign='center'>DELETED</Header> : null}
                <Grid columns={2}>
                    <Grid.Column width={12}>
                        <Header as='h4' textAlign='center'style={{ padding: '10px',color: "black" }}>{property.name}</Header>
                    </Grid.Column>
                    <Grid.Column width={4}> 
                        {!deleted ? 
                            <Button icon='trash' fluid type='button' onClick={() => {
                            setDeleted(!deleted)
                            handleDelete()
                            }} /> 
                            : null 
                        }
                    </Grid.Column>
                </Grid>
            </div>
        </Card>
    )
}

export const AllFormEdits = ({ label, name, type, formik, itemValue, inputType, options = null, handleFieldSubmit }) => {
    const [editState, setEditState] = useState("no edits")

    const handleSave = () => {
        handleFieldSubmit(formik.values)
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
                            {formik.touched[name] && formik.errors[name] && (
                                <div style={{ color: "red" }}>{formik.errors[name]}</div>
                            )}
                        </>
                    ) : (
                        <FormH3> { displayOptions } </FormH3>
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

