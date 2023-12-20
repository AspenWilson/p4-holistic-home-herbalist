import React, { useState, useContext, useEffect } from "react";
import emailjs from "@emailjs/browser";
import { AppContext } from "../../context/AppContext";
import { Button, Input } from "semantic-ui-react";
import { Formik, Form } from "formik";
import * as yup from "yup";


function RecipeEmail({ recipe }) {
    const { user, handleModalSuccess } = useContext(AppContext)
    const [ ingredients, setIngredients ] = useState([])
    const id = recipe.id

    useEffect(() => {    
        fetch(`/api/recipes/${id}/ingredients`)
            .then((resp) => resp.json())
            .then((data) => {
                    setIngredients(data);
                    console.log(data)
                    console.log(recipe);
                })
    }, []);

      const ingredientList = ingredients.map((ingredient) => (
        <li key={ingredient.id}>{ingredient.id}</li>
    ));
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

        article ul {
            color: black;
            float: left;
            padding: 20px;
        }

        article li {
            color: black;
            float: left;
            padding: 20px;
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
            <strong>${recipe.name}</strong><br>
            <em>Entered by: ${recipe.entered_by.username}</em><br>
            </h1> 
            </section>
            <br>
            <nav>
            <ul><strong>Properties</strong>
            ${recipe.properties.map((property) => `<li style="margin: 10px"><strong>${property.name}</strong>: ${property.description}</li>`).join("")}
            </ul>
            <ul><strong>Ingredients:</strong>
            ${ingredients.map((ingredient) => `<li style="margin: 10px"><strong>${ingredient.herb_id}</strong>, ${ingredient.herb_type}: ${ingredient.amount} ${ingredient.amount_type}</li>`).join("")}
            </ul>
            </nav>
            <article>
            <p><strong>Directions:</strong></p>
            <p>${recipe.directions}</p>

            <ul><strong>Ingredients:</strong>
            ${recipe.ingredients.map((ingredient) => `<li style="margin: 10px"><strong>${ingredient.herb.name}</strong>, ${ingredient.herb_type}: ${ingredient.amount} ${ingredient.amount_type}</li>`).join("")}
            </ul>
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
    handleModalSuccess()
    // emailjs.send(
    //   "service_offg4aq",
    //   "template_zp1ifcj",
    //   templateParams,
    //   "PN_0oPztGyVHw2dV_"
    // ).then(
    //   (result) => {
    //     handleModalSuccess()
    //     setStatus('success')
        
    //     console.log(result.text);
    //   },
    //   (error) => {
    //     console.log(error.text);
    //   }
    // );
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

export default RecipeEmail;

// ${ingredients.map((ingredient) => `<li style="margin: 10px"><strong>${ingredient.herb_id}</strong>, ${ingredient.herb_type}: ${ingredient.amount} ${ingredient.amount_type}</li>`).join("")}