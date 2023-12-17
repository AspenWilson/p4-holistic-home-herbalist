import React from "react";
import { Comment, Grid, Card, Image } from 'semantic-ui-react'

function CommentCard({ comment }) {
    
    return (
      <Card key={comment.id} fluid style= {{ backgroundColor: 'rgba(52, 52, 52, 0.8)', padding: '10px' }}>
        <Grid>
          <Grid.Column width={ 3 }>
            <div className='avatar-circle'>
              <Image 
                className="ui centered circular image"
                size='small'
                src={ comment.user.image_url }
              />
            </div>
          </Grid.Column>

          <Grid.Column width={ 13 }>
            <Comment style={{ padding: '10px' }}>
              <Comment.Content>
                <Comment.Author style={{ color: "white" }}>{ comment.user.username }</Comment.Author>
                <Comment.Metadata>
                  <div style={{ color: "white" }}><i>{ comment.entered_on }</i></div>
                </Comment.Metadata>
                <Comment.Text style={{ color: "white" }}>"{ comment.comment }"</Comment.Text>
              </Comment.Content>
            </Comment>
          </Grid.Column>
        </Grid>
      </Card>

    )
}

export default CommentCard