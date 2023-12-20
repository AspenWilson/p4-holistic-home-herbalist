import React from "react";
import { Container, Tab } from 'semantic-ui-react'
import { LiM16, PFont } from "../helpers/StylingHelpers";


function Extracts () {
    const panes = [
        { menuItem: 'About', render: () => <Tab.Pane>
            <PFont >When you harvest a plant, the clock starts ticking on the degradation of its components. Due to the absence of the enzyme cellulase in humans, necessary for breaking down the cell wall structure of plants, even munching on a freshly picked plant may not provide the full medicinal activity. This underscores the importance of extracting herbs into liquid forms for medicinal purposes, with traditional methods involving water for infusions (teas) and decoctions.</PFont>

            <PFont >The liquid employed for herb extraction is known as the solvent or menstruum. Menstruum, derived from alchemical terminology, refers to a substance that dissolves a solid. In this context, various solvents or menstruums are utilized, including water, syrup (a combination of water and sugar), alcohol, glycerin, vinegar, and oil. While these are common, industrial processes for standardized extracts might involve chemical solvents such as acetone.</PFont>

            <PFont >Each menstruum excels at extracting specific constituents while having limitations with others. For instance:</PFont>
            <ul>
                <LiM16 >Water is a poor solvent for resins but excellent for carbohydrates.</LiM16>
                <LiM16 >Alcohol is effective for many medicinal constituents but lacks efficacy in extracting mucilage.</LiM16>
                <LiM16 >Glycerin, without heat and water, is primarily efficient for volatile oils.</LiM16>
            </ul>
            <PFont >The diversity of extraction types includes:</PFont>
            <ul>
                <LiM16 ><strong>Water Extractions:</strong> Primarily used for infusions (teas) and decoctions, extracting water-soluble constituents.</LiM16>
                <LiM16 ><strong>Syrups:</strong>  Combining water and sugar, useful for making extracts that are sweet and palatable.</LiM16>
                <LiM16 ><strong>Alcohol Extractions (Tinctures):</strong>  Utilizing alcohol as a solvent, effective for a wide range of medicinal constituents.</LiM16>
                <LiM16 ><strong>Glycerin Extractions (Glycerites):</strong>  Using glycerin, suitable for those who cannot consume alcohol, but less potent.</LiM16>
                <LiM16 ><strong>Herbal Vinegars or Acid Tinctures:</strong>  Vinegar-based extractions, beneficial for extracting minerals and certain medicinal properties.</LiM16>
                <LiM16 ><strong> Oil Extractions:</strong>  Involving oils as a solvent, useful for extracting lipophilic (fat-soluble) constituents.</LiM16>
            </ul>
            <PFont >Understanding the properties of each menstruum and extraction type allows herbalists to tailor their approach based on the desired medicinal compounds and the characteristics of the plant material. </PFont>
            <PFont >See each individual dosage tab for more information on each of these. </PFont>
        </Tab.Pane>}
    ]
    return (
        <div>
        <Container  fluid >
    <h1>Extracts</h1>
    <Tab menu= {{ fluid: true, vertical: true, tabular: true}} panes={panes} />

    <PFont > </PFont>


    </Container>
    </div>
    )
}

export default Extracts