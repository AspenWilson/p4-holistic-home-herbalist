import React, {useState} from 'react'
import { Card, Button, Grid, Image, Label } from 'semantic-ui-react'
import "../index.css"

function HerbCard ({herb}) {
    const [isSelected, setIsSelected] = useState(false)

    function handleClick () {
        setIsSelected(!isSelected)
    }
    const herbProperties = herb.properties.map((property) => {
        return (
            <Label color="red" tag>{property.name}</Label>
        )
    })

    return (
        <div>
            <Card raised>
                <Image
                    src={herb.image_url}
                    floated="left"
                    size="small"
                    className="herbImg"
                    />
                <Card.Content as='h3'>{herb.name}</Card.Content>
                <Card.Content extra>
                    <Label.Group tag>
                        {herbProperties}
                    </Label.Group>
                </Card.Content>
            </Card>
        </div>
    )
}


                {/* <Card.Content extra>
                    <div className='ui two buttons'>
                    <Button basic color='green'>
                        Approve
                    </Button>
                    <Button basic color='red'>
                        Decline
                    </Button>
                    </div>
                </Card.Content>
            </Card>
                <Card.Content extra>
                    {isSelected ? <Button basic color='red' onClick={handleClick} className='btn'>Unsave</Button> : <Button basic color='green' onClick={handleClick}className='btn'>Saved</Button>}
                </Card.Content>
        </div> */}

    export default HerbCard