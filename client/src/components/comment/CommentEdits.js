import React, {useContext, useEffect, useState} from "react";
import * as yup from "yup";
import { Formik, Form } from "formik";
import { Card } from 'semantic-ui-react';
import { AppContext } from '../../context/AppContext';
import { headers } from "../helpers/GeneralHelpers";
import { FormTextBoxField, displayErrors, SubmitBtn } from "../helpers/FormHelpers";


function CommentEdits ({ id }) {
    const { handleModalSuccess, user, refreshEnteredComments } = useContext(AppContext)
    const [comment, setComment] = useState(null)
    const [error, setError] = useState()

    useEffect(() => {
        fetch(`/api/comments/${id}`)
        .then((resp) => resp.json())
        .then((data) => {
            setComment(data)
        })
    },[id])

    const formSchema = yup.object().shape({
        comment: yup.string().required('Comment is required.')
    })

    const handleSubmit = (values) => {
        const updatedComment = { comment: values.comment }
        fetch(`/api/comments/${id}`, {
            method:'PATCH',
            headers, 
            body: JSON.stringify(updatedComment, null, 2)
        }).then((resp) => {
            if(resp.ok) {
                resp.json().then((data) => {
                    handleModalSuccess()
                    refreshEnteredComments(user)
                })
            } else {
                resp.json().then((err) => setError(err.message))
            }
        })
    }

    if (!comment) {
        return <div>Loading...</div>
    }

    return (
        <Formik
            initialValues={{ comment: comment.comment || "" }}
            enableReinitialize={ true }
            validationSchema={ formSchema }
            onSubmit={ handleSubmit }
        >
        {(formik) => (
            <div className='container'>
                <Card fluid className='flex-outer'>
                    <Form>
                        <Card.Content className='allCards'>
                            <FormTextBoxField label='Edit Comment' name='comment' formik={ formik } />
                            { displayErrors({ error }) }
                        </Card.Content>
                        <SubmitBtn  msg= 'Submit edits'/>
                    </Form>
                </Card>
            </div>
        )}
        </Formik>
    )
}

export default CommentEdits