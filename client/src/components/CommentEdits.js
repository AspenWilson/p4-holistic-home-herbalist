import React, {useContext, useEffect, useState} from "react"
import { Formik, Form } from "formik"
import * as yup from "yup"
import { UserContext } from "../context/AppContext"
import { Card, Button } from 'semantic-ui-react'
import { headers } from "../helpers"
import { FormHeader, StyledTextBox } from "./helpers/StylingHelpers"
import { displayErrors } from "./helpers/FormHelpers"



function CommentEdits ({ id }) {
    const [comment, setComment] = useState(null)
    const { handleModalSuccess, user, refreshEnteredComments, refreshComments } = useContext(UserContext)

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
        const updatedComment = {
            comment: values.comment
        }
        fetch(`/api/comments/${id}`, {
            method:'PATCH',
            headers, 
            body: JSON.stringify(updatedComment, null, 2)
        })
        .then((resp) => {
            if(resp.ok) {
                resp.json().then((data) => {
                    handleModalSuccess()
                    refreshEnteredComments(user)
                    refreshComments()
                })
            }
        })
    }

    if (!comment) {
        return <div>Loading...</div>
    }

    return (
        <Formik
            initialValues={{
                comment: comment.comment || ""
            }}
            enableReinitialize={true}
            validationSchema={formSchema}
            onSubmit={handleSubmit}
        >
            {(formik) => (
                <div className='container'>
                    <Card fluid className='flex-outer'>
                        <Form>
                            <Card.Content className='allCards'>
                                <FormHeader as='h3'>Edit Comment</FormHeader>
                                <StyledTextBox
                                    name='comment'
                                    onChange={formik.handleChange}
                                    value={formik.values.comment}
                                />
                                {displayErrors(formik.errors.comment)}
                            </Card.Content>
                            <Button fluid type='submit'>Submit edits</Button>
                        </Form>
                    </Card>
                </div>
            )}
        </Formik>
    )
}

export default CommentEdits