import React from "react";
import { Container, Tab } from 'semantic-ui-react';
import { LiM16, PFont } from "../helpers/StylingHelpers";

function Fresh () {
    const panes = [
        { menuItem: 'About', render: () => <Tab.Pane>
            <PFont >Nature generously provides remedies for health and wellness, often within reach in your backyard. This guide delves into the art of harvesting, drying, and using fresh herbs for medicinal purposes. While it's not mandatory to harvest your own herbs, doing so fosters a deeper connection with nature and imparts a sense of empowerment.</PFont>
        </Tab.Pane>},
        { menuItem: 'Finding Fresh Herbs', render: () => <Tab.Pane>
            <h2>Growing Herbs: Cultivating Your Medicinal Garden</h2>

            <PFont >Historically, kitchen gardens often housed medicinal herbs. Culinary herbs, known for ease of cultivation, can thrive in planter boxes or small containers. Common choices include basil, cilantro, dill, fennel, garlic, oregano, parsley, rosemary, sage, thyme, and various mints. Medicinal flowers like yarrow, roses, calendula, and chamomile can enhance your garden. Indigenous herbs such as borage, bee balm, catnip, and horehound are also excellent choices.</PFont>

            <h2>Wildcrafting Herbs: Discovering Nature's Medicinal Bounty</h2>

            <PFont >Ralph Waldo Emerson aptly described weeds as "plants whose virtues have yet to be discovered." Begin your herbal journey by acquainting yourself with medicinal weeds in your own backyard. Learn to identify burdock, dandelion, red clover, plantain, mullein, and wild lettuce. Before harvesting, ensure precise identification using Latin names, especially in plant families with similar common names. For safety, acquire books on local plants and herbal guides to cross-reference identification.</PFont>

            <h2>Ethical Wildcrafting: Sustainability Matters</h2>

            <PFont >Preserving the delicate balance of nature is crucial. Overharvesting has endangered some medicinal plants. Refer to organizations like United Plant Savers for a list of at-risk plants. Practice ethical wildcrafting by:</PFont>
            <ul>
                <LiM16 >Gathering only where plants are abundant.</LiM16>
                <LiM16 >Limiting harvest to 10% of plants in an area.</LiM16>
                <LiM16 >Leaving enough plants for replenishment.</LiM16>
                <LiM16 >Understanding a plant's reproductive habits.</LiM16>
                <LiM16 >Seeking permission from plants in a traditional or meditative manner.</LiM16>
            </ul>
        </Tab.Pane> },
        { menuItem: 'Parts of the Plant', render: () => <Tab.Pane>
            <h2>Harvesting and Drying Herbs: Preserving Nature's Bounty</h2>

            <PFont >Ensure harvested plants are free from chemical exposure and environmental pollutants. Harvest only when plants are at their peak, considering the time of day, season, and weather conditions. Drying should occur promptly to maintain potency. Follow specific guidelines for different plant parts:</PFont>
            <ul>
                <LiM16 ><strong>Bark:</strong> Collect outer and inner bark in late fall, winter, or early spring. Harvest from downed trees when possible.</LiM16>
                <LiM16 ><strong>Bulbs:</strong> Harvest after aerial parts wilt, typical for bulbs like garlic and onions.</LiM16>
                <LiM16 ><strong>Flowers:</strong> Harvest when fully open, before wilting. Dry in well-ventilated areas away from sunlight.</LiM16>
                <LiM16 ><strong>Fruits:</strong> Harvest when fully ripened, ensuring ease of detachment. Dry on covered screens.</LiM16>
                <LiM16 ><strong>Leaves and Aerial Parts:</strong> Collect in early to mid-summer, when essential oils are at their peak. Dry away from direct sunlight.</LiM16>
                <LiM16 ><strong>Roots and Rhizomes:</strong> Gather in late fall or when the plant's energy is in the roots. Wash thoroughly, chop into small pieces, and dry away from sunlight.</LiM16>
                <LiM16 ><strong>Sap and Resin:</strong> Harvest in autumn when sap falls or in spring when sap rises. Collect sap from trees or latex plants, ensuring safety precautions.</LiM16>
                <LiM16 ><strong>Seeds:</strong> Harvest when fully ripe, usually in midmorning on dry days. Dry on paper-lined trays.</LiM16>
            </ul>
        </Tab.Pane> },
        { menuItem: 'Using Fresh Herbs', render: () => <Tab.Pane>
            <h2>Using Fresh Plants: Incorporating Nature's Medicine</h2>

            <PFont >Fresh herbs offer various applications:</PFont>
            <ul>
                <LiM16 ><strong>Chewing and Eating:</strong> Consume fresh herbs directly or add them to dishes, soups, or stews.</LiM16>
                <LiM16 ><strong>Infusions and Decoctions:</strong> Extract medicinal properties by steeping herbs in hot water (infusions) or boiling them (decoctions).</LiM16>
                <LiM16 ><strong>Alcohol Extracts:</strong> Create tinctures by steeping herbs in alcohol for an extended period, extracting their medicinal compounds.</LiM16>
                <LiM16 ><strong>Glycerin Extracts:</strong> Ideal for those avoiding alcohol, glycerin extracts capture herbal properties for internal use.</LiM16>
                <LiM16 ><strong>Vinegar Extracts:</strong> Soak herbs in vinegar to create flavorful extracts suitable for culinary use and medicinal applications.</LiM16>
            </ul>
            <PFont >Experiment with different preparations to harness the healing power of fresh herbs in your daily life. Remember, each herb has unique characteristics, and learning about them enhances your herbal knowledge and application. </PFont>
        </Tab.Pane> }
    ]
    return (
        <div>
            <Container  fluid >
                <h1>Fresh herbs</h1>
    <           Tab menu= {{ fluid: true, vertical: true, tabular: true}} panes={panes} />
            </Container>
        </div>
    )
}

export default Fresh