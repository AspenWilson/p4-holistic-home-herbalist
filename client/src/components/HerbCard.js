import React, {useState, useEffect, useContext} from 'react'
import { Card, Image, Label, Button, Icon } from 'semantic-ui-react'
import "../index.css"
import {Link} from 'react-router-dom'
import { propertyTags, url } from '../helpers'
import { UserContext } from '../context/UserContext';
import ModalPopout from './ModalPopout'


function HerbCard ({herb}) {
    const { savedHerbs, user, fetchUpdatedData} = useContext(UserContext)
    const [isSaved, setIsSaved] = useState(savedHerbs.some((savedHerb) => savedHerb.id === herb.id))
    
    useEffect(() => {
        fetchUpdatedData()
        console.log('useEffect from HerbCard')
    },[])

    const handleSave = () => {
        fetch(`/api/users/${user.id}/saved-herbs`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify({herb_id: herb.id})
        })
        .then((resp) => {
            if (resp.ok) {
                setIsSaved(!isSaved)
                fetchUpdatedData()
                
            }
        })
        .catch((error) => {
            console.error('Error:', error)
        })
    }

    const handleUnSave = () => {
        fetch (`/api/users/${user.id}/saved-herbs/${herb.id}`, {
            method:'DELETE'
        })
        .then((resp) => {
            setIsSaved(!isSaved)
            fetchUpdatedData()
        })
        .catch((error) => {
            console.error('Error: ', error)
        })
    }

    return (
        <div key={herb.id}>
            <Card raised>
                <Card.Content>
                    <Button>
                        <Icon name='edit'/>
                        <ModalPopout modalType='herb edits' msg='Edit' id={herb.id}/>
                    </Button>
                    <Image
                        src={herb.image_url}
                        floated='left'
                        size="small"
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
                    {isSaved ? 
                        <Button basic color='orange' onClick={handleUnSave}>Saved</Button> :
                        <Button basic color='yellow' onClick={handleSave}>Save</Button>
                    }
                </Card.Content>
            </Card>
        </div>
    )
}

    export default HerbCard