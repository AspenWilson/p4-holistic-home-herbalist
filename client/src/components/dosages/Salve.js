import React from "react";
import { Container, Tab } from 'semantic-ui-react'
import { PFont } from "../helpers/StylingHelpers";


function Salve () {
    const panes = [
        { menuItem: 'About', render: () => <Tab.Pane>
            <PFont >Salves, often referred to as ointments, represent semi-solid medicinal preparations. They are crafted by solidifying an herbal oil base with ingredients like beeswax or candelilla wax. A crucial aspect of salves is their versatility, serving as carriers for herbs, delivering them directly to tissues or affecting specific areas. </PFont>
        </Tab.Pane>},
        { menuItem: 'Instructions', render: () => <Tab.Pane>
            <PFont >For salves, a 6:1-8:1 ratio of oil to beeswax is employed, allowing for adjustments based on the desired consistency. Wax pellets or grated wax ease the melting process, with beeswax melted separately and poured into warm oil. Despite the effectiveness of salves, cleaning the equipment used in their preparation requires diligence, emphasizing the importance of prompt cleanup while the salve is still in a liquid state. </PFont>
        </Tab.Pane> },
        { menuItem: 'Recommended Products', render: () => <Tab.Pane>Tab 2 Content</Tab.Pane> }
    ]
    return (
        <div>
        <Container  fluid >
    <h1>Salves</h1>
    <Tab menu= {{ fluid: true, vertical: true, tabular: true}} panes={panes} />
    
    
    <PFont > </PFont>
    <PFont > </PFont>


    </Container>
    </div>
    )
}

export default Salve