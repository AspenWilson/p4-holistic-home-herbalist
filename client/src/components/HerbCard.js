import React, {useState} from 'react'
import { Card, Image, Label, Button } from 'semantic-ui-react'
import "../index.css"
import {Link} from 'react-router-dom'
import { propertyTags } from '../helpers'

function HerbCard ({herb}) {

    return (
        <div key={herb.id}>
            <Card raised>
                <Card.Content>
                    <Image
                        src={herb.image_url}
                        floated='left'
                        size="small"
                        // className="herbImg"
                        />
                    <Card.Header>{herb.name}</Card.Header>
                    <Card.Meta>{herb.latin_name}</Card.Meta>
                    <Card.Description >
                        <h3>Properties</h3>
                        <Label.Group tag>
                            {herb.properties.length > 0 ? (
                            propertyTags(herb) 
                            ) : (null)}
                        </Label.Group>
                    </Card.Description>
                </Card.Content>
                <Card.Content extra>
                        <Button basic color='green'>
                        <Link to={`/herbs/${herb.id}`}>View Details</Link> 
                    </Button>
                </Card.Content>
            </Card>
        </div>
    )
}

    export default HerbCard