import React from "react";
import { Container, Tab } from 'semantic-ui-react';
import { PFont } from "../helpers/StylingHelpers";

function Capsules () {

    const panes = [
        { menuItem: 'About', render: () => <Tab.Pane>
            <PFont>The use of herb capsules has surged in popularity due to their easy and convenient dosage form. These capsules, containing dried herbal powders, offer a tasteless alternative, making them especially beneficial for herbs with unpleasant flavors. Additionally, capsules provide the advantage of ingesting the entire plant material, including plant fibers. </PFont>

            <PFont>While gelatin capsules, commonly used, may pose concerns for vegetarians or vegans, alternatives such as all-plant vegetarian capsules are readily available. For those willing to invest some effort, the option to purchase capsules and powders separately for manual filling exists.</PFont>

            <PFont>However, capsules do present challenges, particularly in regulating dosages, especially with potent botanicals. Liquids, such as alcohol tinctures, offer a more precise dosing method for substances like lobelia and black cohosh. Conversely, for herbs requiring larger doses, such as psyllium hulls or slippery elm, swallowing numerous capsules may be impractical.</PFont>

            <PFont>The absence of taste and smell in capsules complicates dosage regulation, as these senses play a crucial role in determining what the body needs. Taste and smell act as natural regulators, assisting in maintaining a balance when consuming natural foods or herbal teas.</PFont>

            <PFont>Moreover, capsules may hinder the immediate effects of herbs that work through the senses on the nervous system. Primary effects, such as the warming sensation caused by pungent herbs, do not occur when encapsulated, leading to only secondary effects after the body absorbs the plant constituents.</PFont>

            <PFont>Certain herb benefits rely heavily on primary effects, which may be compromised by capsules. For instance, bitter herbs like gentian stimulate digestive secretions when taken in liquid form before meals, a response not replicated with capsules. Similarly, diaphoretics like yarrow are more effective in inducing perspiration when taken as hot infusions or liquid extracts rather than in capsule form.</PFont>

            <PFont>Liquid herbs offer faster absorption compared to the time it takes for the body to break down capsules. To maintain primary effects while using capsules, one approach involves breaking open capsules, coating them with herb powder, and consuming them to activate taste receptors without directly tasting the herb. This method allows the majority of the herb to be ingested without the need to endure its taste.</PFont>
        </Tab.Pane> },
        { menuItem: 'Instructions', render: () => <Tab.Pane>
            <PFont>When considering capsules for herbal supplements, it's crucial to factor in dietary preferences and sensitivities. Gelatin capsules, derived from animal by-products, have been the traditional choice, but they might not align with strict vegetarian diets. On the rise are vegetable capsules, plant-based alternatives that cater to vegetarian and vegan preferences.</PFont>

            <PFont>Additional ingredients, such as magnesium stearate, are often included to lubricate machinery during the encapsulation process. While generally well-tolerated, some individuals with sensitive digestive tracts may prefer products without magnesium stearate. Brands like Pure Encapsulations and Thorne have gained popularity for excluding magnesium stearate from their formulations.</PFont>

            <PFont>For those who prefer a hands-on approach, home capsule filling machines are available, typically costing around $30. Alternatively, capsules can be filled manually with a saucer, empty capsules, and powdered herbs. When opting for manual filling, it's essential to store the finished capsules in a cool, dark place.</PFont>

            <PFont>Capsule sizes can vary, affecting the amount of herb powder they hold. Hand-filled size 00 capsules, for example, yield 200-250 mg of powdered herb, while machine-filled capsules usually hold about 45 mg of herb powder per standard size 00 capsule.</PFont>

            <PFont>Consumers are advised to read labels carefully, checking for capsule composition and additional ingredients. Exploring alternative brands and considering efficiency, especially if precision is a priority, ensures a personalized and satisfying herbal supplement experience. Storing finished capsules appropriately helps maintain the potency of the herbs over time. As the market for herbal supplements continues to evolve, an increasing array of capsule options becomes available to cater to diverse dietary needs and preferences.</PFont>
        </Tab.Pane> }
    ]
    return (
        <Container fluid >
        <h1>Capsules</h1>
        <Tab menu= {{ fluid: true, vertical: true, tabular: true}} panes={panes} />
        </Container>
    )
}

export default Capsules