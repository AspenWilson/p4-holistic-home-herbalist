import React, {useContext, useEffect, useState} from "react"
import { useFormik, Formik, Form, Field, FieldArray, ErrorMessage } from "formik"
import * as yup from "yup"
import { UserContext } from "../context/UserContext"
import Select from 'react-select'
import { useParams } from 'react-router-dom';
import { Button, Icon, Card, Grid, Image } from 'semantic-ui-react'
import {DosageEditCards, PropertyEditCards} from "./helpers/EditFormHelpers"


function HerbEdits ({id}) {
    const {properties, handleModalSuccess} = useContext(UserContext)
    const [herb, setHerb] = useState(null)
    const [herbProperties, setHerbProperties] = useState([])
    const [deletedDosages, setDeletedDosages] = useState([])
    const [deletedProperties, setDeletedProperties] = useState([])

    useEffect(() => {
        fetch(`/api/herbs/${id}`)
          .then((resp) => resp.json())
          .then((data) => {
            setHerb(data);
            setHerbProperties(data.properties)
            console.log(data)
          })
          .catch((error) => {
            console.error('Error fetching herb details:', error);
          });
      }, [id]);
    

    const formSchema = yup.object().shape({
        name: yup.string().required("Herb name is required."),
        latin_name: yup.string().required("Latin name is required."),
        description: yup.string().required("Herb description is required."),
        warnings: yup.string().required("Herb warnings are required. 'None' is acceptable if herb has no known warnings."),
        image_url: yup.string().required("Image url link is required."),
        dosages: yup.array().of(
            yup.object().shape({
                dosage_form: yup.string().required("Dosage form is required. "),
                dosage_description: yup.string().required("Dosage description is required. Example: 'Dried leaf (1:5, 50% alcohol); 1-4 ml (0.2-0.8 tsp.) 3-4 times daily.'")
            })
        ),
        property_ids: yup.array().min(1, "At least one property must be added to your new herb.").required("At least one property must be added to your new herb.")
    })

    const handleSubmit = (values) => {
        console.log('called handle submit')
        const updatedHerb = {
            name : values.name,
            latin_name : values.latin_name,
            description : values.description,
            warnings : values.warnings,
            image_url : values.image_url,
            dosages : values.dosages,
            property_ids : values.property_ids
        }
        
        console.log("Submitted values: ", updatedHerb)
        console.log('Deleted dosage ids: ',deletedDosages)
        console.log('Deleted properties: ', deletedProperties)
        handleModalSuccess()
    }

    const options = ['Capsule', 'Capsule or Powder', 'Decoction - Southern','Decoction - Standard','Decoction - Weak', 'Dried', 'Dried Herb', 'Dried or Powdered', 'Dried Seed', 'Essential Oil', 'Extract - Fluid', 'Extract - Solid', 'Extract - Standardized', 'Fresh', 'Fresh Herb', 'Fresh Leaves', 'Fresh or Dried', 'Glycerite', 'Infusion - Cold', 'Infusion - Standard', 'Infusion - Strong', 'Infusion - Weak', 'Infusion - Wine', 'Juice', 'Oil', 'Oil & Salve', 'Powder', 'Syrup', 'Tea', 'Tincture', 'Topical Use']
    
    const propertyDrops = properties.map((prop) => ({
        value: prop.id,
        label: prop.name,
      }));

    const selectedProperties = herbProperties.map((property) => ({
        label: property.name,
        value: property.id,
      }));


    if (!herb) {
        return <div>Loading...</div>;
    }

    return (
        
        <Formik 
            initialValues = {{
                name: herb.name || "",
                latin_name: herb.latin_name || "",
                description: herb.description || "",
                warnings: herb.warnings || "",
                image_url: herb.image_url || "",
                dosages: [{
                    dosage_form: "", 
                    dosage_description: ""
                }],
                property_ids: herb.properties.map((property) => property.id) || []
            }}
            enableReinitialize={true}
            validationSchema = {formSchema}
            onSubmit = {handleSubmit}
        >
            {(formik) => (
                <Card fluid>
                <Form>
                    <Card.Content>
                        <Grid columns={2}>
                            <Grid.Column>
                                <label>Herb Name</label>
                                <br/>
                                <Field
                                    type="text"
                                    name="name"
                                    onChange={formik.handleChange}
                                    value={formik.values.name}
                                />
                                <div style={{ color: "red" }}>
                                    <ErrorMessage name="name" />
                                </div>
                            </Grid.Column>
                            
                            <Grid.Column>
                                <label>Latin Name:</label>
                                <br />
                                <Field
                                    type="text"
                                    name="latin_name"
                                    onChange={formik.handleChange}
                                    value={formik.values.latin_name}
                                />
                                <div style={{ color: "red" }}>
                                    <ErrorMessage name="latin_name" />
                                </div>
                            </Grid.Column>
                        </Grid>
                    </Card.Content>

                    <Card.Content>
                        <label>Description:</label>
                            <textarea
                                type="text"
                                className='textArea'
                                name="description"
                                onChange={formik.handleChange}
                                value={formik.values.description}
                            />
                            <div style={{ color: "red" }}>
                                <ErrorMessage name="description" />
                            </div>

                            <div>
                                <label>Warnings:</label>
                                <Field
                                    type="text"
                                    className='textArea'
                                    name="warnings"
                                    onChange={formik.handleChange}
                                    value={formik.values.warnings}
                                    />
                                <div style={{ color: "red" }}>
                                    <ErrorMessage name="warnings" />
                                </div>
                            </div>
                    </Card.Content>

                    <Card.Content>
                        <label>Image Link</label>
                            <Field
                                type="text"
                                name="image_url"
                                onChange={formik.handleChange}
                                value={formik.values.image_url}
                            />
                            <div style={{ color: "red" }}>
                                <ErrorMessage name="image_url" />
                            </div>
                            <Image 
                                size='small'
                                floated='right'
                                src={formik.values.image_url}
                            />
                    </Card.Content>

                    <FieldArray name="dosages">
                        {({ push, remove }) => (
                            <div>
                                <Card.Group>
                                    {herb.dosages.map((dosage) => {
                                        return (
                                            <DosageEditCards dosage={dosage} deletedDosages={deletedDosages} setDeletedDosages={setDeletedDosages} />
                                        )
                                        })}
                                </Card.Group>

                                {formik.values.dosages.map((_, index) => (
                                    <div key={index}>
                                        <label>Dosage Form</label>
                                        <Field
                                            as="select"
                                            name={`dosages[${index}].dosage_form`}
                                            onChange={formik.handleChange}
                                        >
                                            <option value=""></option>
                                            {options.map((option) => (
                                                <option key={option} value={option}>{option}</option>
                                        ))}
                                        </Field>
                                        <div style={{ color: "red" }}>
                                            <ErrorMessage name={`dosages[${index}].dosage_form`} />
                                        </div>

                                        <label>Dosage Description</label>
                                        <Field
                                            type="text"
                                            name={`dosages[${index}].dosage_description`}
                                            onChange={formik.handleChange}
                                        />
                                        <div style={{ color: "red" }}>
                                            <ErrorMessage name={`dosages[${index}].dosage_description`} />
                                        </div>

                                        <button type="button" onClick={() => remove(index)}>
                                            Remove Dosage
                                        </button>
                                    </div>
                                ))}

                                <button
                                    type="button"
                                    onClick={() => push({ dosage_form: "", dosage_description: "" })}
                                >
                                    Add Dosage
                                </button>
                            </div>
                        )}
                    </FieldArray>
                            <p>Property values: {formik.values.property_ids}</p>
                    <FieldArray name='property_ids'>
                        {({ push, remove }) => (
                            <div>
                                <label>Properties</label>
                                <div>
                                    <Card.Group>
                                        {herb.properties.map((property) => {
                                            return (
                                                <PropertyEditCards property={property} deletedProperties={deletedProperties} setDeletedProperties={setDeletedProperties} />
                                            )
                                        })}
                                    </Card.Group>
                                    <Select
                                        isMulti
                                        isClearable={true}
                                        options={propertyDrops}
                                        onChange={(selectedOptions) => {
                                            formik.setFieldValue(
                                            "property_ids",
                                            formik.values.property_ids.concat(
                                                selectedOptions.map((option) => option.value)
                                            ));
                                        }}
                                    />
                                    <div style={{ color: "red" }}>
                                        <ErrorMessage name="property_ids" />
                                    </div>
                                </div>
                            </div>
                        )}                               
                    </FieldArray>

                    <input type='submit' value='Submit' />
                </Form>
            </Card>
        )}
        </Formik>
        
    )

}

export default HerbEdits