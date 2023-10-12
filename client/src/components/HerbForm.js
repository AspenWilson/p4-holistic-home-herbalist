import React, {useContext} from "react"
import { useFormik, Formik, Form, Field, FieldArray, ErrorMessage } from "formik"
import * as yup from "yup"
import { UserContext } from "../context/UserContext"
import Select from 'react-select'

function HerbForm () {
    const {properties, handleModalSuccess} = useContext(UserContext)
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
    const initialValues= {
        name:"", 
        latin_name:"",
        description:"",
        warnings:"",
        image_url:"",
        dosages: [{
                dosage_form:"",
                dosage_description:""
        }],
        property_ids: []
    }

    const handleSubmit = (values, {resetForm}) => {
        const newHerb = {
            name : values.name,
            latin_name : values.latin_name, 
            description : values.description, 
            warnings : values.warnings,
            image_url : values.image_url,
            dosages: values.dosages,
            property_ids : values.property_ids
        }
        console.log(newHerb)
        resetForm({
            values: initialValues
        })
        handleModalSuccess()
        };
    

    const options = ['Capsule', 'Capsule or Powder', 'Decoction - Southern','Decoction - Standard','Decoction - Weak', 'Dried', 'Dried Herb', 'Dried or Powdered', 'Dried Seed', 'Essential Oil', 'Extract - Fluid', 'Extract - Solid', 'Extract - Standardized', 'Fresh', 'Fresh Herb', 'Fresh Leaves', 'Fresh or Dried', 'Glycerite', 'Infusion - Cold', 'Infusion - Standard', 'Infusion - Strong', 'Infusion - Weak', 'Infusion - Wine', 'Juice', 'Oil', 'Oil & Salve', 'Powder', 'Syrup', 'Tea', 'Tincture', 'Topical Use']

    const propertyDrops = properties.map((prop) => ({
        value: prop.id,
        label: prop.name,
      }));
    
    return (
        <Formik 
            initialValues = {initialValues}
            validationSchema={formSchema}
            onSubmit = {handleSubmit}
        >
        {(formik) => (
        <Form>
            <label>Name</label>
            <Field type='text' name='name' onChange={formik.handleChange} value={formik.values.name} />
            <ErrorMessage name="name" />

            <label>Latin Name</label>
            <Field type='text' name='latin_name' onChange={formik.handleChange} value={formik.values.latin_name} />
            <ErrorMessage name="latin_name" />

            <label>Description</label>
            <Field type='text' name='description' onChange={formik.handleChange} value={formik.values.description} />
            <ErrorMessage name="description" />

            <label>Warnings</label>
            <Field type='text' name='warnings' onChange={formik.handleChange} value={formik.values.warnings} />
            <ErrorMessage name="warnings" />

            <label>Image Link</label>
            <Field type='text' name='image_url' onChange={formik.handleChange} value={formik.values.image_url} />
            <ErrorMessage name="image_url" />

            <FieldArray name="dosages">
            {({ push, remove }) => (
              <div>
                {formik.values.dosages.map((_, index) => (
                  <div key={index}>
                    <label>Dosage Description</label>
                    <Field
                      type="text"
                      name={`dosages[${index}].dosage_description`}
                    />
                    <ErrorMessage name={`dosages[${index}].dosage_description`} />

                    <label>Dosage Form</label>
                    <Field
                      as="select"
                      name={`dosages[${index}].dosage_form`}
                    >
                      <option value=""></option>
                      {options.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </Field>
                    <ErrorMessage name={`dosages[${index}].dosage_form`} />

                    {index > 0 && (
                      <button type="button" onClick={() => remove(index)}>
                        Remove Dosage
                      </button>
                    )}
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

          <label>Properties</label>
          <Select
            isMulti
            isClearable={true}
            options={propertyDrops}
            onChange={(selectedOptions) => {
              formik.setFieldValue(
                "property_ids",
                selectedOptions.map((option) => option.value)
              );
            }}
          />
          <ErrorMessage name="property_ids" />

            <input type='submit' value='Submit' />
        </Form>
    )}
    </Formik>
    )
}

export default HerbForm