import React, { useState } from "react"
import { Button, Icon, Card, Header, Grid, Modal, Input, Popup, TextArea, Divider } from 'semantic-ui-react'
import { StyledInput, StyledTextBox, StyledSelect } from "./StylingHelpers"
import { displayErrors, dosageDrops } from "./FormHelpers"
import '../../index.css'

export function DosageEditCards ({dosage, handleDelete}) {
    const [editState, setEditState] = useState("no edits")

    // const handleEditBtn = () => {
    //     setEditState("edits")
    //     console.log(editState)
    // }

    // const handleSave = () => {
    //     handleFieldSubmit(formik.values)
    //     setEditState("no edits")
    // }

    // const handleCancel = () => {
    //     setEditState("cancelled")
    //     console.log(editState)
    //     console.log (itemValue)
    // }
    // const id = dosage.id

    // const displayOptions = 
    //     editState === "no edits" ? formik.values[name] :
    //     editState === "cancelled" ? itemValue :
    //     null 
    
    return (
        <Card className='flex-inner'>
            <Card.Content>
                <Grid columns={2}>
                    <Grid.Column width={8}>
                        <Header as='h4' textAlign='center' style={{ color: "black" }}> Form:</Header>
                        <p style={{ color: "black" }}>{dosage.dosage_form}</p>
                    </Grid.Column>

                    <Grid.Column width={8}>
                        <Header as='h4' textAlign='center' style={{ color: "black" }}> Description:</Header>
                        <p style={{ color: "black" }}>{dosage.dosage_description}</p>

                    </Grid.Column>
                </Grid>
            </Card.Content>
            <Card.Content>
                <Popup content='Delete dosage' trigger={<Button icon='trash' onClick={() => {
                    handleDelete()
                }}
                /> } />               
            </Card.Content>
        </Card>
    )
}

export function IngredientEditCards ({ ingredient, deletedIngredients, setDeletedIngredients }) {
    const [deleted, setDeleted] = useState(false)
    const id = ingredient.id

    const handleDelete = () => {
        const newList = deletedIngredients.concat({ id })
        setDeletedIngredients(newList)
    }

    return (
        <Card className='flex-inner' style={deleted ? { color: "white", background: "red" } : null}>
            <div key={id}>
            {deleted ? <Header style={{ color: "black" }} textAlign='center'>DELETED</Header> : null}
            <Grid columns={2}>
                <Grid.Column>
                    <Header as='h4' style={{ color: "black" }} textAlign='center'>Amount</Header>
                    <p style={{ color: "black" }}>{ingredient.amount}</p>

                    <Header as='h4' style={{ color: "black" }} textAlign='center'>Amount Type</Header>
                    <p style={{ color: "black" }}>{ingredient.amount_type}</p>
                </Grid.Column>

                <Grid.Column>
                    <Header style={{ color: "black" }} as='h4' textAlign='center'>Herb</Header>
                    <p style={{ color: "black" }}>{ingredient.herb.name}</p>
                    <Header style={{ color: "black" }} as='h4' textAlign='center'>Herb Type</Header>
                    <p style={{ color: "black" }}>{ingredient.herb_type}</p>
                </Grid.Column>
            </Grid>
                {!deleted ? <Button icon='trash' type='button' onClick={() => {
                    setDeleted(!deleted)
                    handleDelete()
                }}
                /> : null }
            </div>
        </Card>
    )
}
    
export function PropertyEditCards ({property, deletedProperties, setDeletedProperties}) {
    const [deleted, setDeleted] = useState(false)
    const id = property.id
    
    const handleDelete = () => {
        const newList = deletedProperties.concat({ id })
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

                        {!deleted ? <Button fluid icon='trash' type='button' onClick={() => {
                            setDeleted(!deleted)
                            handleDelete()
                        }}
                        /> : null }
                    </Grid.Column>
                </Grid>
            </div>
        </Card>
    )
}

export const AllFormEdits = ({ label, name, type, formik, itemValue, handleFieldSubmit, inputType, options = null, handleDelete, deleteOption =  'no', editOptIn = 'yes', isSet = 'no' }) => {
    const [editState, setEditState] = useState("no edits")

    const handleEditBtn = () => {
        setEditState("edits")
        console.log(editState)
    }

    const handleSave = () => {
        handleFieldSubmit(formik.values)
        setEditState("no edits")
    }

    const handleCancel = () => {
        setEditState("cancelled")
        console.log(editState)
        console.log (itemValue)
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
                placeholder={formik.values[name]}
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
        inputType === "nestedInput" ?
            <Input
                style={{ overflowWrap: 'break-word', width: '100%' }}
                type={type}
                id={name}
                name={name}
                value={itemValue}
                onChange={formik.handleChange}
            /> :
        inputType === 'nestedTextBox' ?
            <StyledTextBox
                style = {{ wrapItem: 'true' }}
                id={name}
                as={type}
                name={name}
                placeholder={itemValue}
                onChange={formik.handleChange}
            /> :
        inputType === "nestedSelect" ?
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
                            {displayErrors(formik.errors[name])}
                        </>
                    ) : (
                        <h3  
                            style = {{ 
                                border: '1px solid #056d52', 
                                background:'white', 
                                color:'black', 
                                padding: "5px", 
                                whiteSpace:'nowrap',
                                overflow:'hidden',
                                textOverflow:'ellipsis'
                            }}
                        >
                            { displayOptions }
                        </h3>
                    )}
                </Grid.Column>
                <Grid.Column width={ 3 }>
                    {editState === "edits" ? (
                        <>
                        {isSet === 'no' ? 
                        <>
                        <Popup content='Cancel edits' trigger={<Button onClick={handleCancel} icon='cancel' />} />
                        <Popup content='Save changes' trigger={<Button icon='save' onClick={handleSave} />} />
                        </>
                        : null }
                        </>
                        
                    ) : (
                        <>
                        {editOptIn === 'no' ? null :
                        <>
                        <Popup content='Edit' trigger={<Button onClick={handleEditBtn} icon='edit' />} />
                        {deleteOption === 'yes' ? 
                        <Popup content='Delete' trigger= {<Button onClick={handleDelete} icon='trash'/> } /> : null}
                        </>}
                        </>
                    )}
                </Grid.Column>
            </Grid>
        </div>
    )
}

export const DosageAdditions = ({ formik, handleSubmit, showFalse }) => {
     const [inputFields, setInputFields] = useState([
        {dosage_form: '', dosage_description: ''}
     ])

     const addFields = () => {
        let newField = {dosage_form: '', dosage_description: ''}
        setInputFields([...inputFields, newField])
     }

     const removeFields = (index) => {
        let data = [...inputFields]
        console.log(data.length)
        if (data.length > 1) { 
            data.splice(index,1)
            setInputFields(data) 
        } else {
            console.log('error, cant remove button')
            showFalse()
        }
     }

     const handleSave = (index) => {
        handleSubmit(formik.values)
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
                    </Grid.Column>
                        <Grid.Column width={3}>
                            
                        
                <br />
                    <Popup content='Save changes' trigger={<Button fluid icon='save' onClick={handleSave} />} />
                    <br/>
                    <Popup content='Delete new addition' trigger={<Button fluid icon='cancel' onClick={ () => removeFields()} /> } />
                    </Grid.Column>
                    </Grid>
                </div>
            )
        })}
        <br />
                            <Divider fitted />
                            <br/>
        <Button centered fluid icon='plus' onClick={addFields}>Add more</Button>
        </>
    )
}

export const DosageChanges = ({ dosage, type, formik, handleFieldSubmit, handleDelete }) => {
    const [editState, setEditState] = useState("no edits")

    const handleEditBtn = () => {
        setEditState("edits")
        console.log(editState)
    }

    const handleSave = () => {
        handleFieldSubmit(formik.values)
        setEditState("no edits")
    }

    const handleCancel = () => {
        setEditState("cancelled")
        console.log(editState)
        console.log ({dosage})
    }
    const deleteCall = () => {
        console.log({dosage})
        handleDelete({dosage})
    }

    return (
        <div style={{  alignItems: 'center' }}>
            <Grid columns = {3}>
                <Grid.Column width={4}>
                    <h3  style={{ color: 'black' }}>Form:</h3> 
                        {editState === "edits" ? (
                            <>
                                <StyledSelect 
                                    classNamePrefix="Select"
                                    name='dosage_form'
                                    options={dosageDrops}
                                    placeholder={formik.values['dosage_form']}
                                    onChange={(selectedOption) => {
                                    formik.setFieldValue('dosage_form', selectedOption.value)
                                    }}
                                />
                                {displayErrors(formik.errors['dosage_form'])}
                            </>
                        ) : (
                            <h3  
                                style = {{ 
                                    border: '1px solid #056d52', 
                                    background:'white', 
                                    color:'black', 
                                    padding: "5px", 
                                    whiteSpace:'nowrap',
                                    overflow:'hidden',
                                    textOverflow:'ellipsis'
                                }}
                            >
                                {formik.values['dosage_form']}
                            </h3>
                        )}
                </Grid.Column>
                <Grid.Column width = {9}>
                    <h3  style={{ color: 'black' }}>Description:</h3>
                        {editState === "edits" ? (
                            <>
                                <StyledTextBox
                                    style = {{ wrapItem: 'true' }}
                                    as={type}
                                    name='dosage_description'
                                    value={formik.values['dosage_description']}
                                    onChange={formik.handleChange}
                                />
                                {displayErrors(formik.errors['dosage_description'])}  
                            </>
                        ) : (
                            <h3  
                                style = {{ 
                                    border: '1px solid #056d52', 
                                    background:'white', 
                                    color:'black', 
                                    padding: "5px", 
                                    whiteSpace:'nowrap',
                                    overflow:'hidden',
                                    textOverflow:'ellipsis'
                                }}
                            >
                                {dosage.dosage_description}
                            </h3>
                        )}
                </Grid.Column>
                <Grid.Column width={3}>
                    {editState === "edits" ? (
                        <div style={{  alignItems: 'center' }}>
                            <Popup content='Cancel edits' trigger={<Button onClick={handleCancel} icon='cancel' />} />
                            <br/>
                            <br/>
                            <Popup content='Save changes' trigger={<Button icon='save' onClick={handleSave} />} />
                            </div>
                    ) : (
                        <>
                            <Button fluid onClick={handleEditBtn} icon='edit'>Edit</Button>
                            <br/>
                            <Button fluid onClick={deleteCall} icon='trash'>Delete</Button>
                            </>
                    )}
                </Grid.Column>
            </Grid>
        </div>
    )
}
