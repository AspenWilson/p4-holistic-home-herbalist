import React from 'react'
import PropertyCard from './PropertyCard'

function Properties({properties, user}) {

    const allProperties = properties.map((property) =>{
        return (
        <PropertyCard property={property}/>
        )
    })
    return (
        <div className='card-grid'>
            <h3>User = {user.username}</h3>
        {allProperties}
    </div>
    )
}

export default Properties