import React, {useState, useContext} from 'react'
import { Link } from 'react-router-dom'
import { Card, Image, Label, Button } from 'semantic-ui-react'
import { propertyTags, headers } from '../helpers'
import { UserContext } from '../context/AppContext';
import ModalPopout from './ModalPopout'

function HerbCard ({herb, page}) {
    const { savedHerbs, user, refreshSavedHerbs, refreshEnteredHerbs, refreshHerbs } = useContext(UserContext)
    const [isSaved, setIsSaved] = useState(savedHerbs.some((savedHerb) => savedHerb.id === herb.id))

    const handleSave = () => {
        fetch(`/api/users/${user.id}/saved-herbs`, {
            method: 'POST',
            headers,
            body: JSON.stringify({herb_id: herb.id})
        })
        .then((resp) => {
            if (resp.ok) {
                setIsSaved(!isSaved)
                refreshSavedHerbs(user)
            }})
    }

    const handleUnSave = () => {
        fetch (`/api/users/${user.id}/saved-herbs/${herb.id}`, {
            method:'DELETE',
            headers
        })
        .then((resp) => {
            if (resp.ok) {
                setIsSaved(!isSaved)
                refreshSavedHerbs(user)
            }})
    }

    const handleDelete = () => {
        fetch(`/api/herbs/${herb.id}`, {
            method:'DELETE',
            headers
        })
        .then((resp) => {
            if (resp.ok) {
                refreshEnteredHerbs(user)
                refreshHerbs()
            }})
    }

    return (
        <Card raised>
            <Card.Content>
                <Image
                    src={herb.image_url}
                    floated='left'
                    size="small"
                />
                {isSaved ? 
                    <Button icon='star' circular style={{ color: "#056d52" }} floated='right' onClick={handleUnSave}/> :
                    <Button icon='star outline' circular style={{ color: "#056d52" }} floated='right' onClick={handleSave}/>
                }
                <br />
                <br />
                { page === 'profile - entered' ?                     
                    <div >
                        <Button.Group vertical floated='right' >
                            <ModalPopout modalType='herb edits' msg='Edit Herb' id={herb.id}/> 
                            <Button circular  icon="trash" color='red' onClick={handleDelete}/>            
                        </Button.Group>
                    </div>
                : null }
            </Card.Content>

            <Card.Content>
                <Card.Header>{herb.name}</Card.Header>
                <Card.Meta>{herb.latin_name}</Card.Meta>
                <Card.Description >
                    <h3>Properties</h3>
                    <Label.Group tag>
                        {herb.properties.length > 0 ? (
                        propertyTags(herb.properties) 
                        ) : (null)}
                    </Label.Group>
                </Card.Description>
            </Card.Content>

            <Button color='black'>
                <Link to={`/herbs/${herb.id}`} style={{color: 'white'}}>View Details</Link> 
            </Button>

        </Card>
    )
}

    export default HerbCard