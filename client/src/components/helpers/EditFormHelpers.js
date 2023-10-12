import React, {useContext, useEffect, useState} from "react"
import { useFormik, Formik, Form, Field, FieldArray, ErrorMessage } from "formik"
import { Button, Icon, Card, Grid, Header } from 'semantic-ui-react'

export function DosageEditCards ({dosage, deletedDosages, setDeletedDosages}) {
    const [deleted, setDeleted] = useState(false)
    const id = dosage.id
    const handleDelete = () => {
        const newList = deletedDosages.concat({ id })
        setDeletedDosages(newList)
    }
        return (
            <Card style={deleted ? { color: "white", background: "red" } : null}>
            <div key={id}>
                {deleted ? <Header textAlign='center'>DELETED</Header> : null}
                <label>Dosage Form:</label>
                <p>{dosage.dosage_form}</p>

                <label>Dosage Description:</label>
                <p>{dosage.dosage_description}</p>

                <Button type='button' onClick={() => {
                    console.log(id)
                    setDeleted(!deleted)
                    handleDelete()
                }}
                >
                    <Icon name={!deleted ? "trash" : "add"} />
                </Button>
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
            <Card style={deleted ? { color: "white", background: "red" } : null}>
                <div key={id}>
                {deleted ? <Header textAlign='center'>DELETED</Header> : null}
                <label>{property.name}</label>

                <Button type='button' onClick={() => {
                    console.log(id)
                    setDeleted(!deleted)
                    handleDelete()
                }}
                >
                    <Icon name={!deleted ? "trash" : "add"} />
                </Button>
            </div>

            </Card>
        )
    }
