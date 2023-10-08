import React, {useState, useContext} from 'react'
import {useHistory} from 'react-router-dom'
import styled from "styled-components";
import { useFormik } from "formik"
import * as yup from "yup"
import { UserContext } from '../context/UserContext';


function Authentication() {
  const [signUp, setSignUp] = useState(false)
  const history = useHistory()
  const [error, setError] = useState(null)
  const { handleLogin } = useContext(UserContext)

  const handleClick = () => setSignUp((signUp) => !signUp)
  const formSchema = yup.object().shape({
    username: yup.string().required("Please enter a user name"),
  })

  const formik = useFormik({
    initialValues: {
      username:'',
      password:''
    },
    validationSchema: formSchema,
    onSubmit: (values) => {
        fetch(signUp?'/api/signup':'/api/login',{
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values, null, 2),
        })
        .then(resp => {
          if(resp.ok){
            resp.json().then(user => {
              console.log(user)
              handleLogin(user)
              history.push('/')
            })
          } else {
            resp.json().then(error => setError(error.message))
          }
        })
    },
  })

    return (
        <> 
        <h2 style={{color:'red'}}> {formik.errors.name}</h2>
        {error&& <h2 style={{color:'red'}}> {error}</h2>}
        <h2>Please Log in or Sign up!</h2>
        <h2>{signUp?'Already a member?':'Not a member?'}</h2>
        <button onClick={handleClick}>{signUp?'Log In!':'Register now!'}</button>
        <Form onSubmit={formik.handleSubmit}>
        <label>
          Username
          </label>
        <input type='text' name='username' value={formik.values.username} onChange={formik.handleChange} />
        <label>
           Password
           </label>
           <input type='password' name='password' value={formik.values.password} onChange={formik.handleChange} />
        <input type='submit' value={signUp?'Sign Up!':'Log In!'} />
      </Form>
        </>
    )
}

export default Authentication

export const Form = styled.form`
display:flex;
flex-direction:column;
width: 400px;
margin:auto;
font-family:Arial;
font-size:30px;
input[type=submit]{
  background-color:#42ddf5;
  color: white;
  height:40px;
  font-family:Arial;
  font-size:30px;
  margin-top:10px;
  margin-bottom:10px;
}
`
