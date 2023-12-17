import React, { useState, useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { useFormik } from "formik"
import * as yup from "yup"
import { AppContext } from '../context/AppContext';
import { Card, Image } from 'semantic-ui-react'
import { FormInputField } from './helpers/FormHelpers';
import { FormHeader, Form, BrandedBtn } from "./helpers/StylingHelpers"
import { headers } from './helpers/GeneralHelpers';
import { dividerBreaks } from './helpers/GeneralHelpers';




function Authentication() {
  const { handleLogin } = useContext(AppContext)
  const [signUp, setSignUp] = useState(false)
  const [errors, setErrors] = useState([])
  const history = useHistory()
    
  const handleClick = () => {
    setSignUp(!signUp)
  }
  const formSchema = yup.object().shape({
    username: yup.string().required("Please enter a user name."),
    password: yup.string().required("Please enter a password."),
    email: yup.string(), 
    image_url: yup.string()
  })

  const formik = useFormik({
    initialValues: {
      username:'',
      password:'',
      email:'',
      image_url:''
    },
    validationSchema: formSchema,
      onSubmit: (values) => {
        fetch(signUp ? '/api/signup' : '/api/login',{
          method: "POST",
          headers,
          body: JSON.stringify(values, null, 2),
        })
        .then(resp => {
          if(resp.ok){
            resp.json().then(user => {
              handleLogin(user)
              history.push('/')
          })
        } else {
          resp.json().then((err) => {
              setErrors(err.message);
          })
        }
        })
      },
  })


  return (
    <> 
      <Card raised centered >
        <br />
        <Image centered style={{ background: 'none' }}src={'/Logo-black.png'} size='small'/>
        <FormHeader as='h2'>Log In!</FormHeader>
        {errors ? <h3 style={{ color:'red' }}> { errors }</h3> : null}
        <Card.Content>
          <Form onSubmit={ formik.handleSubmit }>
            <FormInputField label='Username' name='username' type='text' formik={ formik } />
            
            <FormInputField label='Password' name='password' type='password' formik={ formik } />
            
            { !signUp ? null : 
              <FormInputField label='Email' name='email' type='text' formik={ formik } /> }
            
            { !signUp ? null : 
              <FormInputField label='Profile picture link' name='image_url' type='text' formik={ formik } />}
            
            {dividerBreaks()}
            
            <BrandedBtn  type='submit' msg={signUp?'Sign Up!':'Log In!'} />
            
            {dividerBreaks()}
            
            <FormHeader as='h3'>{signUp?'Already a member? Sign in!':'Not a member? Sign up!'}</FormHeader>
            
            <BrandedBtn onClick={ handleClick } type='button' msg={signUp ? 'Log In!': 'Register now!'} />
          </Form>
        </Card.Content>
      </Card>
    </>
  )
}

export default Authentication

