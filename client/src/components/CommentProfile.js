import React, { useContext } from "react";
import { Button, Card, Grid } from 'semantic-ui-react'
import { Link } from 'react-router-dom';
import ModalPopout from "./ModalPopout";
import { headers } from "../helpers";
import { UserContext } from "../context/AppContext";

function CommentCard ({ comments }) {
    const { refreshEnteredComments, user, refreshComments } = useContext(UserContext)

    const handleDelete = (id) => {
        fetch(`/api/comments/${id}`,{
            method: 'DELETE',
            headers
        })
        .then ((resp) => {
            if(resp.ok) {
                refreshEnteredComments(user)
                refreshComments()
            }
        })
    }
    const allComments = comments.map((comment) => {
        return (
            <Card>
                <Grid columns={2}>
                    <Grid.Column width={12}>
                        <h4  style={{color: 'black', padding: '10px'}}>{comment.comment}</h4>
                        <p style={{color: 'black', padding: '10px'}}>
                        <small>{comment.entered_on}</small></p>
                    </Grid.Column>
                    <Grid.Column width={4}>
                        <Card.Content>
                            <Button.Group vertical floated='right'>

                                <ModalPopout modalType='comment edits' id={comment.id} msg='Edit Comment'/>
                                <Button icon='trash' style={{backgroundColor: '#056d52', color:'white'}} onClick={handleDelete(comment.id)}/>
                            </Button.Group>
                        </Card.Content>
                    </Grid.Column>
                </Grid>
                <br />
                <Button fluid style={{backgroundColor: '#056d52', color:'white'}} as={Link} to={`/recipes/${comment.recipe_id}`}>
                    See Recipe
                </Button>
            </Card>

        )
    })

    return (
        <Card.Group itemsPerRow={4}>
            {allComments}
        </Card.Group>
    )
}

export default CommentCard