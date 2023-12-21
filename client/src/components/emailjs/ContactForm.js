import React, { useContext, useState } from "react";
import * as yup from "yup";
import { Formik, Form } from "formik";
import emailjs from '@emailjs/browser';
import { Container, Grid } from 'semantic-ui-react';
import { AppContext } from '../../context/AppContext';
import SuccessModal from "../modals/SuccessModal";
import { FormInputField,FormTextBoxField, SubmitBtn } from "../helpers/FormHelpers";

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
                <Container  fluid style= {{ backgroundColor: '#ccc', padding: '10px' }}>
                    <SuccessModal statusIs={statusIs} setStatus={setStatus} />
                    <Form >
                        <h1 style={{ color: 'black'}}>Contact Us!</h1>
                        <Grid>
                            <Grid.Column width={6}> 
                                <FormInputField
                                    name='name'
                                    type='text'
                                    formik={formik}
                                    label='Name'
                                />
                                <FormInputField
                                        name='email'
                                        type='text'
                                        formik={formik}
                                        label='Email'
                                />
                            </Grid.Column>
                            <Grid.Column width={10}> 
                                <FormTextBoxField 
                                    name="message" 
                                    formik={formik}
                                    label='Message'
                                />
                                <br/>
                                <br/>
                                <SubmitBtn  msg= 'Send Message'/>
                            </Grid.Column>
                        </Grid>
                    </Form>
                </Container>
            )}
        </Formik>
    )
}

export default ContactForm