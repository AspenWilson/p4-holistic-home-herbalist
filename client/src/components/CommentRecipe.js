import React from "react";
import { Comment, Grid, Card } from 'semantic-ui-react'

function CommentCard({ comment }) {
    
    return (
      <Card fluid style= {{ backgroundColor: 'rgba(52, 52, 52, 0.8)', padding: '10px' }}>
        <Grid>
          <Grid.Column width={ 3 }>
            <div className='avatar-circle'>
              { comment.user.username[0].toUpperCase() }
            </div>
          </Grid.Column>

          <Grid.Column width={ 13 }>
            <Comment style={{ padding: '10px' }}>
              <Comment.Content>
                <Comment.Author style={{ color: "white" }}>{ comment.user.username }</Comment.Author>
                <Comment.Metadata>
                  <div style={{ color: "white" }}><i>{ comment.entered_on }</i></div>
                </Comment.Metadata>
                <Comment.Text style={{ color: "white" }}>{ comment.comment }</Comment.Text>
              </Comment.Content>
            </Comment>
          </Grid.Column>
        </Grid>
      </Card>

    )
}

export default CommentCard