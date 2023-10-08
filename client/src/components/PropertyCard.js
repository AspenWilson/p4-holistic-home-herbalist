import React, { useContext, useState } from "react";
import { Card } from 'semantic-ui-react'
import { UserContext } from '../context/UserContext';


function PropertyCard({property}){

    return (
        <Card raised key={property.id}>
            <Card.Content as='h3'>{property.name}</Card.Content>
            <Card.Content>{property.description}</Card.Content>
        </Card>
    )

}

export default PropertyCard