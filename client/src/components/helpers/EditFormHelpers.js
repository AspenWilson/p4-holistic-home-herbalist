import React, { useState } from "react"
import { Button, Icon, Card, Header, Grid } from 'semantic-ui-react'

export function DosageEditCards ({dosage, deletedDosages, setDeletedDosages}) {
    const [deleted, setDeleted] = useState(false)
    const id = dosage.id
    
    const handleDelete = () => {
        const newList = deletedDosages.concat({ id })
        setDeletedDosages(newList)
    }
    
    return (
        <Card className='flex-inner' style={deleted ? { color: "white", background: "red" } : null}>
            {deleted ? <Header textAlign='center'>DELETED</Header> : null}
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

                <Button icon type='button' onClick={() => {
                    setDeleted(!deleted)
                    handleDelete()
                }}
                >
                    <Icon name={!deleted ? "trash" : null} />
                </Button>
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
        <Card className='flex-inner' style={deleted ? { color: "white", background: "red" } : null}>
            <div key={id}>
            {deleted ? <Header textAlign='center'>DELETED</Header> : null}
                <Grid columns={2}>
                    <Grid.Column width={13}>

                        <Header as='h4' textAlign='center'style={{ padding: '10px',color: "black" }}>{property.name}</Header>
                    </Grid.Column>

                    <Grid.Column width={3}> 

                        {!deleted ? <Button icon='trash' type='button' onClick={() => {
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
