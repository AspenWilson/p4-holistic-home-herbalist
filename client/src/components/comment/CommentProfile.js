import React, { useContext } from "react";
import { Link } from 'react-router-dom';
import { ModalPopout } from '../ModalPopout';
import { headers } from "../helpers/GeneralHelpers";
import { AppContext } from '../../context/AppContext'
import { DeleteModal } from "../helpers/CardHelpers";
import { Button, Card, Grid } from 'semantic-ui-react'

function CommentCard ({ comments }) {
    const { refreshEnteredComments, user, handleModalSuccess } = useContext(AppContext)

    const handleDelete = (id) => {
        fetch(`/api/comments/${id}`,{
            method: 'DELETE',
            headers
        }).then ((resp) => {
            if(resp.ok) {
                handleModalSuccess()
                refreshEnteredComments(user)
            }
        })
    }
    const allComments = comments.map((comment) => {
        return (
            <Card key={ comment.id } style={{ color: 'black', padding: '10px' }}>
                <h3>"{ comment.comment }"</h3>
                <h4 >Recipe: { comment.recipe.name }</h4>
                <small>Entered on: { comment.entered_on }</small>
                <br/>

                <Grid columns={ 3 }>
                    <Grid.Column width={ 12 }>
                <Button fluid style={{ backgroundColor: '#056d52', color:'white' }} as={ Link } to={ `/recipes/${comment.recipe_id}` }> See Recipe </Button>
                    </Grid.Column>

                    <Grid.Column width={ 4 }>
                        {/* <Card.Content> */}
                            <Button.Group  floated='right'>
                                <ModalPopout modalType='comment edits' id={ comment.id } msg='Edit Comment'/>
                                <DeleteModal handleDelete={() => handleDelete(comment.id)} />
                            </Button.Group>
                        {/* </Card.Content> */}
                    </Grid.Column>
                </Grid>
                <br />
            </Card>
        )
    })

    return (
        <Card.Group itemsPerRow={ 4 }>
            { allComments }
        </Card.Group>
    )
}

export default CommentCard