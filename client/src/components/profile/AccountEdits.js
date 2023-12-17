import React, {useContext, useState} from "react"
import { Formik, Form } from "formik"
import * as yup from "yup"
import { AppContext } from "../../context/AppContext"
import { Card, Grid, Image } from 'semantic-ui-react'
import { FormHeader } from "../helpers/StylingHelpers"
import { AllFormEdits } from "../helpers/EditFormHelpers"
import { SuccessModal } from "../ModalPopout"
import { displayErrors } from "../helpers/FormHelpers"
import '../../index.css'

function AccountEdits() {
    const { user } = useContext(AppContext)
    const [statusIs, setStatus] = useState(null)
    const [error, setError] = useState([])

    const formSchema = yup.object().shape({
        username: yup.string().required("Please enter a username."),
        password: yup.string().required("Please enter a password."),
        email: yup.string().required("Please enter an email.")
    })

    return (
        <div className="container">
            <Card fluid className='flex-outer'>
                <SuccessModal statusIs={statusIs} setStatus={setStatus} />
                <h2>Edit Profile</h2>
                <Formik
                    initialValues={{
                        username: user.username || "", 
                        image_url: user.image_url || "",
                        email: user.email || "",
                        password: "*******"
                    }}
                    enableReinitialize={true}
                    validationSchema={ formSchema }
                >
                {(formik) => (
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
                                    {displayErrors({ error })}
                                        <AllFormEdits  
                                            itemValue={user.username}
                                            name='username'
                                            type='text'
                                            inputType='input' 
                                            label='Username:'
                                            formik={ formik } 
                                            setStatus={setStatus}
                                            setError={setError}
                                        />
                                        <br />
                                        <AllFormEdits  
                                            itemValue={user.email}
                                            name='email' 
                                            type='text' 
                                            inputType='input'
                                            formik={ formik } 
                                            label='Email:' 
                                            setStatus={setStatus}
                                            setError={setError}
                                        />
                                        <br/>
                                        <AllFormEdits  
                                            itemValue={"********"}
                                            name='password' 
                                            type='password' 
                                            formik={ formik } 
                                            label='Password:' 
                                            setStatus={setStatus}
                                            setError={setError}
                                            inputType='input'
                                        />
                                        <AllFormEdits 
                                            itemValue={user.image_url}
                                            name='image_url' 
                                            label='Profile picture link:' 
                                            type='textarea' 
                                            inputType='textarea'
                                            formik={ formik } 
                                            setStatus={setStatus}
                                            setError={setError}
                                        />
                                    </Grid.Column>
                                </Grid>
                            </Card.Content>
                        </Form> 
                    )} 
                </Formik>
            </Card>
        </div>
    )
}

export default AccountEdits