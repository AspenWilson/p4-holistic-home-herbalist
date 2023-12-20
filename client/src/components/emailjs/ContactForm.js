import React, { useContext, useState } from "react"
import emailjs from '@emailjs/browser';
import { Formik, Form } from "formik"
import * as yup from "yup"
import { Container, Grid, Input, Button } from 'semantic-ui-react'
import { StyledTextBox } from "../helpers/StylingHelpers"
import { AppContext } from '../../context/AppContext'
import { SuccessModal } from "../ModalPopout"

function ContactForm () {
    const { user } = useContext(AppContext)
    const [statusIs, setStatus] = useState(null)

    const formSchema = yup.object().shape({
        name: yup.string().required("Name is required."),
        email: yup.string().email("Email is invalid.").required("Email is required."),
        message: yup.string().required("Message is required.")
    })

    const initialValues = {
        name: user.username || '',
        email: user.email || '',
        message: ''
    }

    const sendEmail = (values, {resetForm}) => {
        emailjs.send('service_offg4aq', 'template_4hkes04', values, 'PN_0oPztGyVHw2dV_')
          .then((result) => {
              console.log(result.text);
              setStatus('success') 
              resetForm({ values: initialValues })
          }, (error) => {
              console.log(error.text);
          });
      };

    return (
        <Formik 
            initialValues={initialValues}
            validationSchema={formSchema}
            enableReinitialize={true}
            onSubmit={sendEmail}
        >
            {(formik) => (
                <Container  fluid style= {{ backgroundColor: 'rgba(52, 52, 52, 0.8)', padding: '10px' }}>
                    <SuccessModal statusIs={statusIs} setStatus={setStatus} />
                    <Form >
                        <h1 >Contact Us!</h1>
                        <Grid>
                            <Grid.Column width={6}> 
                                <h2>Name</h2>
                                <Input fluid 
                                    name='name'
                                    type='text'
                                    value={formik.values['name']}
                                    onChange= {formik.handleChange}
                                />
                                <h2>Email</h2>
                                <Input fluid 
                                        name='email'
                                        type='text'
                                        value={formik.values['email']}
                                        onChange= {formik.handleChange}
                                />
                            </Grid.Column>
                            <Grid.Column width={10}> 
                                <h2>Message</h2>
                                <StyledTextBox 
                                    name="message" 
                                    value={formik.values['message']}
                                    onChange= {formik.handleChange}
                                /> 
                                <br/>
                                <br/>
                                <Button fluid style={{backgroundColor: '#056d52', color:'white', font:'Arial' }} type='submit'>Send Message</Button>
                            </Grid.Column>
                        </Grid>
                    </Form>
                </Container>
            )}
        </Formik>
    )
}

export default ContactForm