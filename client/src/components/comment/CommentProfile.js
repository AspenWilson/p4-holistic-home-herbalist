import React, { useContext } from "react";
import { Button, Card, Grid } from 'semantic-ui-react'
import { Link } from 'react-router-dom';
import ModalPopout from "../ModalPopout";
import { headers } from "../helpers/GeneralHelpers";
import { AppContext } from '../../context/AppContext'
import { DeleteModal } from "../helpers/CardHelpers";

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
            <Card id={ comment.id }>
                {/* <h4 style={{ color: 'black', padding: '10px' }}>Recipe: { comment.recipe.name }</h4> */}
                <h3  style={{ color: 'black', padding: '10px' }}>{ comment.comment }</h3>

                <Grid columns={ 2 }>
                    <Grid.Column width={ 12 }>
                        {/* <h4  style={{ color: 'black', padding: '10px' }}>{ comment.comment }</h4> */}
                        <p style={{ color: 'black', padding: '10px' }}>
                            <h4>Recipe: { comment.recipe.name }</h4><br/>
                        <small>Entered on: { comment.entered_on }</small></p>
                    </Grid.Column>

                    <Grid.Column width={ 4 }>
                        <Card.Content>
                            <Button.Group vertical floated='right' style={{ padding:'5px'}}>
                                <ModalPopout modalType='comment edits' id={ comment.id } msg='Edit Comment'/>
                                <DeleteModal handleDelete={() => handleDelete(comment.id)} />
                            </Button.Group>
                        </Card.Content>
                    </Grid.Column>
                </Grid>
                <br />
                <Button fluid style={{ backgroundColor: '#056d52', color:'white' }} as={ Link } to={ `/recipes/${comment.recipe_id}` }> See Recipe </Button>
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