import React, { useState, useContext } from "react";
import emailjs from "@emailjs/browser";
import { AppContext } from "../../context/AppContext";
import { Button, Input } from "semantic-ui-react";
import { Formik, Form } from "formik";
import * as yup from "yup";


function HerbEmail({ herb }) {
    const { user } = useContext(AppContext)
    const [ showForm, setShowForm ] = useState(false)
    const [statusIs, setStatus] = useState(null)
    const logo_url = '/Logo-white.png'
    // '../../public/Logo-white.png'
    // 'https://vscode.dev/github/AspenWilson/p4-holistic-home-herbalist/blob/main/client/public/Logo-white.png'
  const [message, setMessage] = useState(`
  <html>
  <head>
    <style>
      * {
        box-sizing: border-box;
      }
      body {
        background-color: #056d52;
        font-family: 'Lato','Helvetica Neue',Arial,Helvetica,sans-serif;
        padding: 30px;
        margin: 20px
      }
      header {
        background-color: #666;
        padding: 30px;
        text-align: center;
        font-size: 35px;
        color: white;
      }
      h1 {
        background-color: #666;
        padding: 30px;
        font-size: 32px;
        color: white;
        height: fit-content
      }
      h2 {
        color: white; 
        text-align: center;
      }
      p {
        background-color: white; 
        color: black
    }
      section {
        display: -webkit-flex;
        display: flex;
        background-color: white; 
        color: black
        padding: 30px;
      }
      nav {
        float: left;
        width: 40%;
        background: #ccc;
        padding: 10px;
        color: black
      }
      nav ul {
        padding: 10px;
      }
      h1 img {
        float: left;
        width: 40%
      }
      h1 strong {
        float: left;
        width: 60%;
        padding: 20px
      }
      h1 em {
        float: left;
        width: 60%;
        font-size: 24pt;
        padding: 20px
      }
      article {
        float: left;
        padding: 20px;
        width: 60%;
        padding: 10px;
      }
      @media {
        section {
          -webkit-flex-direction: column;
          flex-direction: column;
        }
      }
    </style> 
  </head>
  <body>
    <header style="background-color: #056d52">
      <img src=${`https://drive.google.com/file/d/1Hf204D91BPwlygdMolYIomd5MhlGeTqY/view`} alt='HHH Logo'>
    </header>
    <h2 >Your requested information from Holistic Home Herbalist</h2>
    <section>
      <p style="padding: 20px";>Hello ${user.username}, <br><br>
    You have requested information from Holistic Home Herbalist! See below for your requested information:</p>
    </section>
    <section>
      <div style="padding: 12px; border: 10px solid #d0d0d0 " >
      <section>
        <h1>
          <img src=${herb.image_url}>
          <strong>${herb.name}</strong><br>
          <em>${herb.latin_name}</em><br>
        </h1> 
        </section>
        <br>
        <nav>
          <ul><strong>Properties</strong>
          ${herb.properties.map((property) => `<li style="margin: 10px"><strong>${property.name}</strong>: ${property.description}</li>`).join("")}
          </ul>
          <ul><strong>Dosages</strong>
          ${herb.dosages.map((dosage) => `<li style="margin: 10px"><strong>${dosage.dosage_form}</strong>: ${dosage.dosage_description}</li>`).join("")}
          </ul>
        </nav>
        <article>
          <p><strong>Description:</strong></p>
          <p>${herb.description}</p>
          <p><strong>Warnings:</strong></p>
          <p>${herb.warnings}</p>
        </article>
      </div>
    </section>
    <section>
      <p style="padding: 20px">Be Well,<br>
        <i style= "font-family: Bradley Hand, cursive">HHH Admin</i>
      </p>
    </section>
  </body>
  </html>
  `);

  const formSchema = yup.object().shape({
    email: yup.string().email().required('Email is required.'),
  })

  const initialValues = {
    email: user.email || '',
  }

  const sendEmail = (values) => {
    const templateParams = {
        email: values['email'],
        message: message
      }
    console.log(templateParams);
    emailjs.send(
      "service_offg4aq",
      "template_zp1ifcj",
      templateParams,
      "PN_0oPztGyVHw2dV_"
    ).then(
      (result) => {
        console.log(result.text);
      },
      (error) => {
        console.log(error.text);
      }
    );
  }
  
  return (
    <Formik
        initialValues={initialValues}
        validationSchema={formSchema}
        enableReinitialize={true}
        onSubmit={sendEmail}
    >
        {(formik) =>(
            <Form>
                <h2>Confirm your email:</h2>
                <Input fluid 
                    name='email' 
                    type='text' 
                    value={formik.values['email']} 
                    onChange={formik.handleChange} 
                />
                {formik.touched['email'] && formik.errors['email'] && (
                    <div style={{ color: "red" }}>{formik.errors['email']}</div>
                )}
                <Button fluid style={{backgroundColor: 'black', color:'white', font:'Arial' }} type='submit'>Send email!</Button>
                <div>
                    <div dangerouslySetInnerHTML={{ __html: message }} />
                </div>
            </Form>
        )}
    </Formik>
  );
}

export default HerbEmail;

