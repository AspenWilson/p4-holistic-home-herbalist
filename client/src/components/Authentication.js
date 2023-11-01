import React, { useState, useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { useFormik } from "formik"
import * as yup from "yup"
import { UserContext } from '../context/AppContext';
import { Card, Button, Image } from 'semantic-ui-react'
import { displayErrors } from './helpers/FormHelpers';
import { FormHeader, StyledInput, Form } from "./helpers/StylingHelpers"



function Authentication() {
  const [signUp, setSignUp] = useState(false)
  const history = useHistory()
  const { handleLogin } = useContext(UserContext)
    
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
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values, null, 2),
        })
        .then(res => {
          if(res.ok){
            res.json().then(user => {
              handleLogin(user)
              history.push('/')
          })} 
        })
      },
  })

  return (
    <> 
      <Card raised centered >
        <br />
        <Image centered style={{background: 'none'}}src={'/Logo-black.png'} size='small'/>
        <FormHeader as='h2'>Log In!</FormHeader>
        <Card.Content>
          <Form onSubmit={formik.handleSubmit}>
            <FormHeader as='h3'>Username</FormHeader>
            <StyledInput name='username' value={formik.values.username} onChange={formik.handleChange} />
            {displayErrors(formik.errors.username)}

            <FormHeader as='h3'>Password</FormHeader>
            <StyledInput type='password' id='password' name='password' value={formik.values.password} onChange={formik.handleChange} />
            {displayErrors(formik.errors.password)}
                    
            <Button style={{backgroundColor: '#056d52', color:'white', font:'Arial', margin: '10px', display:'inline-block'}} type='submit'>{signUp?'Sign Up!':'Log In!'}</Button>
            
            <FormHeader as='h3'>{signUp?'Already a member?':'Not a member?'}</FormHeader>
            <Button style={{backgroundColor: '#056d52', color:'white', font:'Arial', margin: '10px', display:'inline-block'}} onClick={handleClick}>{signUp?'Log In!':'Register now!'}</Button>
          </Form>
        </Card.Content>
      </Card>
    </>
  )
}

export default Authentication

