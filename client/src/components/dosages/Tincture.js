import React from "react";
import { Container, Tab } from 'semantic-ui-react'
import { PFont } from "../helpers/StylingHelpers";


function Tincture () {
    const panes = [
        { menuItem: 'About', render: () => <Tab.Pane>
            <PFont>Alcohol stands out as an exceptional medium for extracting herbs, widely embraced by professional herbalists in the form of alcohol extracts or tinctures. Renowned for its efficacy in dissolving various herb constituents, alcohol is versatile enough to be used for tinctures from both fresh and dried plants. The longevity of alcohol preparations surpasses that of other herbal extracts, ensuring they can be stored for extended periods without compromising potency.</PFont>

            <PFont>Alcohol extracts offer precise dosing, making them ideal for potent or potentially toxic botanicals. The ability to regulate dosages by the drop, coupled with the sensory experience of tasting the herbs, enhances the control over intake. Additionally, alcohol's rapid absorption into the bloodstream makes tinctures a fast-acting dosage form, suitable for both internal and external applications.</PFont>

            <PFont>However, there are considerations with alcohol extracts. In large doses, alcohol can be toxic to the body, but the amount in a tincture is relatively small. For instance, a 1-milliliter dose with an average alcohol content of 50% equates to only ½ milliliter of alcohol. Comparatively, a glass of commercial orange juice can contain up to 1½ milliliters of naturally occurring alcohol. Caution is advised with young children, and in emergencies, it's recommended to reduce alcohol content by evaporation or dilution with water.</PFont>

            <PFont>While tinctures are preferred for many herbs, some factors, such as religious beliefs, contraindications for children, or considerations for recovering alcoholics or individuals with liver disorders, might steer herbalists toward alternative preparations.</PFont>

            <PFont>Alcohol's extraction capabilities vary, and some herbs are better suited to other menstruums. Water-based preparations, while effective, come with a limited shelf life, necessitating the use of preservative actions for longer-lasting liquid preparations. The historical roots of alcohol in herbalism trace back thousands of years, evidenced by residues found in ancient clay pots and various cultures' use of fermented drinks for medicinal purposes.</PFont>
        </Tab.Pane>},
        { menuItem: 'Instructions', render: () => <Tab.Pane>
            <h2>Herbal beers and wines:</h2>
            <PFont>Historically, bittering agents and flavorings (gruit) in beers varied globally, with households and regions favoring specific herb combinations. Herb-infused wines, dating back to Hippocrates, played a significant role in materia medicas before the seventeenth century. Despite this, the role of medicinal wines in modern herbalism is arguably underappreciated.</PFont>

            <h2>Distillation:</h2>
            <PFont>The origins of alcohol distillation are debated, with evidence pointing to Chinese, Italian, Greek, or Arabian origins. Distillation's spread in medicine was gradual, evolving from decoctions and wine infusions to the introduction of distilled alcohol (aqua vitae or brandy) as a solvent. The continuous column still in the early nineteenth century marked a significant advancement in achieving higher ethanol concentrations.</PFont>

            <h2>Dried herb tinctures (Macerations):</h2>
            <PFont>Maceration, a common method for making tinctures, involves soaking herbs in a solution of alcohol and water for at least 14 days. This cold process requires no heat, and standard tinctures often use a weight-to-volume ratio of 1:5 with dried herbs. The alcohol content varies based on the plant and constituents to be extracted, typically ranging from 40-60%. Macerations should be kept in a dark place, shaken daily, and strained after the allotted time.</PFont>

            <h2>Fresh plant tinctures (Macerations):</h2>
            <PFont>Fresh plant tinctures, due to their higher water content, often utilize 95% alcohol. The extraction process involves blending or chopping fresh plant material with alcohol, followed by a maceration period of at least 14 days. Remarkably, forgotten jars of fresh plant macerations have proven effective even after more than 5 years.</PFont>

            <h2>Using alcohol with other solvents:</h2>
            <PFont>Enhancing the extraction process, herbalists can blend alcohol with other solvents. Adding 10% glycerin to an alcohol tincture aids in extracting volatile oils and stabilizing tannins, offering a more pleasant taste. Combining alcohol with vinegar or raw sugar/honey introduces versatility, allowing for a diverse range of herbal elixirs with distinct properties. Understanding these nuanced approaches empowers herbalists to tailor their preparations for optimal efficacy and safety. </PFont>
        </Tab.Pane> },
        { menuItem: 'Recommended Products', render: () => <Tab.Pane>Tab 2 Content</Tab.Pane> }
    ]
    return (
        <div>
        <Container  fluid >
    <h1>Tinctures</h1>
    <Tab menu= {{ fluid: true, vertical: true, tabular: true}} panes={panes} />

    <PFont > </PFont>
    <PFont > </PFont>
    <PFont > </PFont>

    </Container>
    </div>
    )
}

export default Tincture