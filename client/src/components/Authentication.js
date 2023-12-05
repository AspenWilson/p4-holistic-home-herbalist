import React, { useState, useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { useFormik } from "formik"
import * as yup from "yup"
import { AppContext } from '../context/AppContext';
import { Card, Button, Image } from 'semantic-ui-react'
import { FormInputField } from './helpers/FormHelpers';
import { FormHeader, Form } from "./helpers/StylingHelpers"
import { headers } from './helpers/GeneralHelpers';




function Authentication() {
  const [signUp, setSignUp] = useState(false)
  const history = useHistory()
  const { handleLogin } = useContext(AppContext)
  const [error, setError] = useState(null)
    
  const handleClick = () => setSignUp((signUp) => !signUp)
  const formSchema = yup.object().shape({
    username: yup.string().required("Please enter a user name."),
    password: yup.string().required("Please enter a password.")
  })

  const formik = useFormik({
    initialValues: {
      name:'',
      password:''
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
          resp.json().then((error) => {
            setError(error.error)
          })
        }
        })
      },
  })


  return (
    <> 
      <Card raised centered >
        <br />
        <Image centered style={{background: 'none'}}src={'/Logo-black.png'} size='small'/>
        <FormHeader as='h2'>Log In!</FormHeader>
        {error ? <h3 style={{color:'red'}}> {error}</h3> : null}
        <Card.Content>
          <Form onSubmit={formik.handleSubmit}>
            <FormInputField label='Username' name='username' type='text' formik={formik} />
            <FormInputField label='Password' name='password' type='password' formik={formik}/>
                    
            <Button style={{backgroundColor: '#056d52', color:'white', font:'Arial', margin: '10px', display:'inline-block'}} type='submit'>{signUp?'Sign Up!':'Log In!'}</Button>
            
            <FormHeader as='h3'>{signUp?'Already a member? Sign in!':'Not a member? Sign up!'}</FormHeader>
            <Button 
              style={{ backgroundColor: '#056d52', color:'white', font:'Arial', margin: '10px', display:'inline-block' }} 
              onClick={handleClick}>
                {signUp?'Log In!':'Register now!'}
            </Button>
          </Form>
        </Card.Content>
      </Card>
    </>
  )
}

export default Authentication

