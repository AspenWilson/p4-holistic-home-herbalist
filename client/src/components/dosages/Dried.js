import React from "react";
import { Container, Tab } from 'semantic-ui-react'
import { LiM16, PFont, LiM14 } from "../helpers/StylingHelpers";

function Dried () {
    const panes = [
        { menuItem: 'About', render: () => <Tab.Pane>
            <PFont >Drying herbs is one of the oldest and most effective techniques for preserving their medicinal properties. While some herbs may lose potency during the drying process, others may see an enhancement in strength. Herbs are often powdered after drying, but it's crucial to note that powdered herbs tend to lose potency faster than their cut, sifted, or whole counterparts due to increased exposure to air. These powders find applications in encapsulation, tablet production, extracts, and various topical preparations.</PFont>

            <h2>Purchasing Dried Herbs: Choosing Wisely</h2>

            <PFont >When buying bulk herbs, your dependence on the supplier's integrity in herb identification and harvesting practices is paramount. Opt for herb vendors with a reputation for accuracy. Preference should be given to organically grown or wildcrafted herbs. Organically grown herbs are devoid of chemical pesticides, herbicides, and fertilizers, contributing to a cleaner end product. Wildcrafted herbs, sourced from the wild, are free from chemical contaminants if harvested away from roadsides and farms.</PFont>

            <PFont >While cultivated herbs support plant conservation by avoiding depletion of wild stands, native habitat-grown plants may boast higher potency. Plants often produce more medicinal compounds in response to environmental stress, potentially resulting in greater efficacy.</PFont>

            <h2>Varieties of Dried Herbs: Whole, Sliced, Cut and Sifted, or Powdered</h2>

            <PFont >Dried herbs are available in various forms—whole, sliced, cut and sifted, or powdered. The more extensive the surface area exposed to light and air, the quicker the deterioration. To maintain potency, it's advisable to keep herbs whole or cut and sifted until ready for use. Cutting and sifting can be efficiently achieved with a small coffee grinder or a Vitamix.</PFont>

            <h2>Quality Control in Herb Purchases: Key Considerations</h2>

            <PFont >Quality control is pivotal when purchasing herbs, and several factors merit attention:</PFont>
            <ul>
                <LiM16>Adulteration and Incorrect Species:</LiM16>
                    <ul>
                        <LiM14 >Cheaper brands may compromise on quality, potentially containing the wrong plant species or non-medicinal plant parts. Opt for reputable companies ensuring the correct species and plant parts.</LiM14>
                    </ul>
                <LiM16>Harvesting Time and Location:</LiM16>
                    <ul>
                        <LiM14 >The potency of herbs can vary based on the time of harvest and the geographical location. Ensure that herbs are harvested at the right time and from suitable locations.</LiM14>
                    </ul>
                <LiM16>Sustainable Harvesting:</LiM16>
                    <ul>
                        <LiM14 >Choose suppliers committed to sustainable harvesting practices. Avoid those supporting wildcrafters endangering medicinal plant species.</LiM14>
                    </ul>
                <LiM16>Cleanliness and Contaminants:</LiM16>
                    <ul>
                        <LiM14 >Assess the cleanliness of the herb material, checking for dirt, insect parts, pesticides, herbicides, heavy metals, and other chemical contaminants. This scrutiny is particularly vital for herbs sourced from heavily polluted regions.</LiM14>
                    </ul>
                <LiM16>Reputable Manufacturers:</LiM16>
                    <ul>
                        <LiM14 >Purchase herbal products, including bulk herbs, exclusively from reputable manufacturers to ensure product quality and safety.</LiM14>
                    </ul>
            </ul>
        </Tab.Pane>},
        { menuItem: 'Recommended Products', render: () => <Tab.Pane>Tab 2 Content</Tab.Pane> }
    ]
    return (
        <div>
            <Container  fluid >
        <h1>Dried herbs</h1>
        <Tab menu= {{ fluid: true, vertical: true, tabular: true}} panes={panes} />

        <PFont > </PFont>
        <PFont > </PFont>
        <PFont > </PFont>

        </Container>
        </div>
    )
}

export default Dried