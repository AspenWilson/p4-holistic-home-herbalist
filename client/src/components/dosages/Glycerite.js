import React from "react";
import { Container, Tab } from 'semantic-ui-react'
import { LiM16, PFont } from "../helpers/StylingHelpers";


function Glycerite () {
    const panes = [
        { menuItem: 'About', render: () => <Tab.Pane>
            <PFont >Glycerin, a semiclear, nontoxic, sweet-tasting liquid derived from vegetable or animal fats, is gaining popularity as an extraction medium, albeit less frequently used than alcohol. Our body processes glycerin every time we consume fats, as fats are broken down into fatty acids and glycerin during the digestive process.</PFont>

            <PFont>When considering herbal extracts, glycerin offers both advantages and disadvantages compared to alcohol. One notable advantage is its nontoxic nature, making it suitable for young children, alcoholics, and individuals unable to consume alcohol. However, glycerites, or extracts made with glycerin, are generally less potent than alcohol tinctures, necessitating larger doses. The sweet taste of glycerin is beneficial for masking the bitterness of many herbs, similar to a syrup. Importantly, glycerin does not spike blood sugar levels, making it suitable for most people, although caution is advised for diabetics.</PFont>

            <PFont>Alcohol, being a superior preservative and more cost-effective, has its merits. Nevertheless, properly made glycerites boast a reasonably long shelf life, with some remaining effective even after a decade. One downside of glycerin is its poor solvent properties without heat, making it less effective for extracting heat-sensitive herbs or fresh plant glycerites. However, glycerin has inherent therapeutic properties, acting as an antifungal and antimicrobial agent, while also being soothing and emollient.</PFont>
            
            <PFont>Glycerites find particular utility for children, alcoholics, and those averse to the taste of alcohol tinctures. Storage in a cool, dark place ensures a shelf life of at least 3 years, with refrigeration being an additional precaution for some individuals.</PFont>

            <PFont> Moving to herbal vinegars, their use spans thousands of years, serving as flavor enhancers and food preservers. Culinary vinegars, made by bruising herbs, covering them with vinegar, and allowing the mixture to sit for two weeks before straining, are ideal for use in salads, dressings, marinades, gravies, and sauces. Berry or floral vinegars involve steeping berries or flowers in vinegar, while medicinal vinegars use high-mineral herbs. </PFont>

            <PFont>Herbal vinegars are valued for bone building, salads, and cooking, aiding in the regulation of gut flora. While less potent than alcohol or glycerin extracts, they offer an affordable means of incorporating herbs into the diet. Additionally, vinegar is used in some tinctures to acidify the solution, proving beneficial for hard water or when extracting alkaloids from herbs.</PFont>
        </Tab.Pane>},
        { menuItem: 'Instructions', render: () => <Tab.Pane>
            <PFont>The process of making glycerites involves various methods:</PFont>
            <h2>Traditional method:</h2>
            <ol>
                <LiM16>Equal parts strong decoction/infusion and glycerin (50% water, 50% glycerin).</LiM16>
                <LiM16>Increase glycerin to 60% to prevent mold growth.</LiM16>
                <LiM16>Optionally, add 20% of 80-proof alcohol for extended shelf life.</LiM16>
            </ol>
            <h2>Standard method:</h2>
            <ol>
                <LiM16>Use syrup-making method with 55% glycerin, 45% water.</LiM16>
                <LiM16>Add herbs (1:5 ratio), simmer, strain, and bottle.</LiM16>
            </ol>
            <h2>Sealed Simmer Glycerites:</h2>
            <ol>
                <LiM16>Mixture of 60% glycerin, 40% water.</LiM16>
                <LiM16>Extract in canning jars (1:5 ratio), boiling water bath, or steam canner.</LiM16>
            </ol>
            <h2>Fresh Plant Glycerites:</h2>
            <ol>
                <LiM16>Stuff jar with fresh material, 70% glycerin, 30% water.</LiM16>
                <LiM16>Process in boiling water for about 15 minutes.</LiM16>
            </ol>
        </Tab.Pane> },
        { menuItem: 'Recommended Products', render: () => <Tab.Pane>Tab 2 Content</Tab.Pane> }
    ]
    return (
        <div>
        <Container  fluid>
    <h1>Glycerins</h1>
    <Tab menu= {{ fluid: true, vertical: true, tabular: true}} panes={panes} />

    <PFont > </PFont>
    <PFont > </PFont>
    <PFont > </PFont>


    </Container>
    </div>
    )
}

export default Glycerite