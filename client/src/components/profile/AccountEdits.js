import React, {useContext, useState} from "react"
import { Formik, Form } from "formik"
import * as yup from "yup"
import { AppContext } from "../../context/AppContext"
import { Card, Grid, Image, Modal } from 'semantic-ui-react'
import { headers } from "../helpers/GeneralHelpers"
import { FormHeader } from "../helpers/StylingHelpers"
import { AllFormEdits } from "../helpers/EditFormHelpers"

function AccountEdits() {
    const { user, checkSession } = useContext(AppContext)
    const [ open, setOpen ] = useState(false)

    const formSchema = yup.object().shape({
        username: yup.string().required("Please enter a username."),
        password: yup.string().required("Please enter a password."),
        email: yup.string().required("Please enter an email.")
    })

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
                    console.log(data)
                    setOpen(true)
                })
            }
        })
    }

    return (
        <Formik
            initialValues={{
                username: user.username || "", 
                image_url: user.image_url || "",
                email: user.email || "",
                password: "*******"
            }}
            validationSchema={ formSchema }
        >
        {(formik) => (
        <div className="container">
            <h2>Edit Profile</h2>
                <Card fluid >
                    <Form>
                        <Card.Content style={{ padding: '15px'}}>
                            <FormHeader as='h2'>Personal info</FormHeader>
                                <Grid columns={ 2 } >
                                    <Grid.Column width={6}>
                                        <Image 
                                            className="ui centered circular image"
                                            size='medium'
                                            src={ formik.values.image_url }
                                        />
                                    </Grid.Column>
                                    <Grid.Column width={10}>
                                        <AllFormEdits  
                                            itemValue={user.username}
                                            name='username' 
                                            type='text' 
                                            formik={ formik } 
                                            label='Username:'
                                            handleFieldSubmit={(values) => handleSubmit(values, 'username')}
                                            inputType='input'
                                        />
                                        <br />
                                        <AllFormEdits  
                                            itemValue={user.email}
                                            name='email' 
                                            type='text' 
                                            formik={ formik } 
                                            label='Email:' 
                                            handleFieldSubmit={(values) => handleSubmit(values, 'email')}
                                            inputType='input'
                                        />
                                        <br/>
                                        <AllFormEdits  
                                            itemValue={"********"}
                                            name='password' 
                                            type='password' 
                                            formik={ formik } 
                                            label='Password:' 
                                            handleFieldSubmit={(values) => handleSubmit(values, 'password')}
                                            inputType='input'
                                        />
                                        <AllFormEdits 
                                            itemValue={user.image_url}
                                            name='image_url' 
                                            label='Profile picture link:' 
                                            type='textarea' 
                                            formik={ formik } 
                                            handleFieldSubmit={(values) => handleSubmit(values, 'image_url')}
                                            inputType='textarea'
                                        />
                                    </Grid.Column>
                                </Grid>
                        </Card.Content>
                            { SuccessModal() }
                    </Form>
                </Card>
            </div>
            )} 
        </Formik>
    )
}

export default AccountEdits