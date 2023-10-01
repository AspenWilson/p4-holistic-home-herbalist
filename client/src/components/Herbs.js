import React from 'react'
import HerbCard from './HerbCard'
import {Grid, Card} from 'semantic-ui-react'
import "../index.css"

function Herbs({herbs}) {

    const allHerbs = herbs.map((herb) => {
        return (
            <HerbCard herb={herb} key={herb.id}/>
        )
    })

    return (
        <div className='card-grid'>
            {allHerbs}
        </div>
    )
}

export default Herbs