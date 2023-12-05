import React, { useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import { Card, Image, Label, Button } from 'semantic-ui-react'
import { headers } from '../helpers/GeneralHelpers'
import { AppContext } from '../../context/AppContext';
import ModalPopout from '../ModalPopout'
import { DeleteModal, propertyTags } from '../helpers/CardHelpers';

function HerbCard ({ herb, page }) {
    const { savedHerbs, user, refreshSavedHerbs, refreshEnteredHerbs, refreshHerbs, handleModalSuccess } = useContext(AppContext)
    const { name, latin_name, properties, image_url, id } = herb
    const [isSaved, setIsSaved] = useState(savedHerbs.some((savedHerb) => savedHerb.id === herb.id))

    const toggleSavedStatus = () => {
      const method = isSaved ? 'DELETE' : 'POST';
      fetch(`/api/users/${user.id}/saved-herbs${isSaved ? `/${id}` : ''}`, {
        method,
        headers,
        body: !isSaved ? JSON.stringify({ herb_id: id }) : undefined,
      }).then((resp) => {
        if (resp.ok) {
          setIsSaved(!isSaved);
          refreshSavedHerbs(user);
        }
      });
    };

    const handleDelete = () => {
        fetch(`/api/herbs/${herb.id}`, {
            method:'DELETE',
            headers,
        }).then((resp) => {
            if (resp.ok) {
              handleModalSuccess()
              refreshEnteredHerbs(user)
              refreshHerbs()
        }})
    }

    return (
        <Card raised>
            <Card.Content>
                <Image src={image_url} floated='left' size="small" />
                <Button 
                    icon={isSaved? 'star' : 'star outline'} 
                    circular 
                    style={{ color: "#056d52" }} 
                    floated='right' 
                    onClick={ toggleSavedStatus }
                /> 
                <br />
                <br />
                { page === 'profile - entered' ?                     
                    <div >
                        <Button.Group vertical floated='right' >
                            <ModalPopout modalType='herb edits' msg='Edit Herb' id={ id }/> 
                            <DeleteModal handleDelete={ handleDelete } />            
                        </Button.Group>
                    </div>
                : null }
            </Card.Content>

            <Card.Content>
                <Card.Header>{name}</Card.Header>
                <Card.Meta>{latin_name}</Card.Meta>
                <Card.Description >
                    <h3>Properties</h3>
                    <Label.Group tag>
                        { properties.length > 0 ? propertyTags(properties) : (null) }
                    </Label.Group>
                </Card.Description>
            </Card.Content>

            <Button color='black'>
                <Link to={`/herbs/${id}`} style={{ color: 'white' }}>View Details</Link> 
            </Button>
        </Card>
    )
}

export default HerbCard