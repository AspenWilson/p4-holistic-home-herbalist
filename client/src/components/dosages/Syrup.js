import React from "react";
import { Container,Tab } from 'semantic-ui-react';
import { LiM16, PFont } from "../helpers/StylingHelpers";


function Syrup () {
    const panes = [
        { menuItem: 'About', render: () => <Tab.Pane>
            <PFont >A syrup is a water-based herbal extraction that combines water with a sweetener, often raw sugar or honey, in a 50% sweetener to 50% water ratio. Syrups serve as a palatable means to mask the bitterness of herbs, commonly used for cold and cough remedies, and are particularly effective for soothing sore throats, coughs, and digestive upsets. While honey adds to the medicinal value of the syrup, it's not recommended for children under one year old.</PFont>
            <PFont >Syrups are suitable for children and the elderly, but their high sugar content can be problematic for individuals with diabetes or those avoiding sugar. Refrigerated, syrups typically last about a month, but their shelf life can be extended by adding alcohol. </PFont>
        </Tab.Pane>},
        { menuItem: 'Instructions', render: () => <Tab.Pane>
            <h2 >Sweeteners: </h2>
            <ul>
                <LiM16 ><strong>Honey:</strong> Natural sweetener with antibiotic and antiseptic properties. It contains about 40% fructose, 31% glucose, 18% water, 9% other sugars, and 2% sucrose. Avoid giving honey-based syrups to children under one year. </LiM16>

                <LiM16 ><strong>Maple Syrup:</strong> Made by boiling the sap of maple trees, it contains primarily sucrose, similar to raw sugar. It is rich in manganese and moderately rich in zinc. </LiM16>

                <LiM16 ><strong>Raw Sugar:</strong> Natural sugars like raw sugar, yellow D sugar, or freeze-dried sugarcane juice (Sucanat) can be used. While not as sweet as honey, they add flavor to the syrup. </LiM16>
            </ul>
            <h2>Standard Method:</h2>
            <ol>
                <LiM16 >Mix sweetener and water in equal parts. </LiM16>
                <LiM16 >Add herbs at a ratio of 1:5 (20% of the volume of liquid by weight). </LiM16>
                <LiM16 >Bring to a boil, then simmer, covered, for 20-30 minutes. </LiM16>
                <LiM16>Strain the herbs and bottle the syrup.</LiM16>
            </ol>
            <h2>Simple Method:</h2>
            <ol>
                <LiM16>Make a strong infusion or decoction of herbs.</LiM16>
                <LiM16>Measure the volume and add an equal amount of honey or raw sugar. </LiM16>
            </ol>
            <h2>Using Syrups:</h2>
            <ul>
                <LiM16>High sugar content makes them unsuitable for certain conditions like diabetes. </LiM16>
                <LiM16>Avoid with severe intestinal dysbiosis; use cautiously with hypoglycemia.</LiM16>
                <LiM16>Doses range from 1 teaspoon to 2 tablespoons.</LiM16>
                <LiM16>Store in the refrigerator for up to a month; discard if an off taste or mold appears.</LiM16>
                <LiM16>To extend shelf life, add 20% of an 80-proof alcohol like brandy or rum. Syrups with alcohol last longer when refrigerated or canned.</LiM16>
            </ul>
        </Tab.Pane> }
    ]

    return (
        <div>
            <Container  fluid >
                <h1>Syrups</h1>
                <Tab menu= {{ fluid: true, vertical: true, tabular: true}} panes={panes} />
            </Container>
        </div>
    )
}

export default Syrup