import React, {useContext} from 'react'
import PropertyCard from './PropertyCard'
import { UserContext } from '../context/UserContext';
import {Card} from 'semantic-ui-react'


function Properties() {
    const { properties, user } = useContext(UserContext)

    const allProperties = properties.map((property) =>{
        return (
        <PropertyCard property={property} key={property.id}/>
        )
    })
    return (
        <Card.Group itemsPerRow={1}>
            {allProperties}
        </Card.Group>
    )
}

export default Properties