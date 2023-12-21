import React from "react";
import { Container, Tab } from 'semantic-ui-react';
import { LiM16, PFont } from "../helpers/StylingHelpers";

function Decoctions () {

        const panes = [
            { menuItem: 'About', render: () => <Tab.Pane>
                <PFont >Water stands as the oldest extraction medium for herbs, providing a simple and straightforward method to transform herbs into liquid form through two primary techniques: infusions and decoctions. </PFont>
                <PFont >Infusions, also known as herbal teas or tisanes, involve pouring boiling water over an herb and allowing it to steep for a determined time before straining. Cold infusions, where the herb is soaked in water, are also an option, particularly for delicate plant parts like flowers and leaves. Infusions are commonly used for aromatic and more pleasant-tasting herbs.</PFont>
                <PFont > In contrast, decoctions differ from infusions as the herb is simmered in water. This process involves bringing water to a boil, adding the herbs, reducing heat, and simmering for a specified period. Decoctions effectively draw out constituents less readily released from plant material, extracting more minerals, tannins, and bitter principles than infusions. Both methods are cost-effective, easy to prepare, and provide an efficient means of ingesting herbs. They can be stored in the refrigerator for several days and consumed as needed, allowing the body's senses to regulate the appropriate dosage.</PFont>
                <PFont >However, teas and decoctions may not be suitable for herbs with unpleasant tastes, and certain constituents are not water-soluble. Despite these limitations, they remain fundamental in herbal extractions.</PFont>
                <PFont >For tougher plant parts like bark, roots, rhizomes, seeds, nuts, or woody stems, the decoction method is essential. Decoction is particularly effective for extracting mineral salts from green plant parts, but it's not suitable for aromatic herbs since simmering evaporates volatile principles.</PFont>
                <PFont > Decoctions, like infusions, may contain one or multiple ingredients and can be ingested hot or cold or applied externally. It's recommended to make decoctions fresh daily and refrigerate any unused portions, as they typically remain viable for up to three days.</PFont>
            </Tab.Pane>},
            { menuItem: 'Instructions', render: () => <Tab.Pane>
                <PFont > Three variations of decoctions are commonly used:</PFont>
                <h2>Standard Decoction:</h2>
                <ol>
                        <LiM16>Combine 30 grams of herb and 1 liter of water (1 ounce per quart) in a pot.</LiM16>
                        <LiM16>Cover, bring to a low simmer for 10-20 minutes, turn off the heat, and steep for an additional hour. </LiM16>
                </ol>
                <h2>Strong Decoction:</h2>
                <ol>
                        <LiM16> Place 30 grams of herb and 1 liter of water (1 ounce per quart) in a pot.</LiM16>
                        <LiM16>Cover, bring to a low simmer until the water is reduced by half.</LiM16>
                </ol>
                <h2>Southern Decoction:</h2>
                <ol>
                        <LiM16>Combine 30 grams of herb and 2 liters of water (1 ounce per 2 quarts) in a pot.</LiM16>
                        <LiM16>Bring to a low simmer for 4 or more hours until about 500 milliliters (about 1 pint) of fluid remains.</LiM16>
                        <LiM16>This extended process allows volatile oils to escape while extracting more mineral salts, resulting in a decoction with a different medicinal action than standard teas. </LiM16>
                </ol>
            </Tab.Pane> }
        ]
    return (
        <div>
            <Container  fluid >
        <h1>Decoctions</h1>
        <Tab menu= {{ fluid: true, vertical: true, tabular: true}} panes={panes} />
        </Container>
        </div>
    )
}

export default Decoctions