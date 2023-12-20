import React from "react";
import { Container, Tab } from 'semantic-ui-react'
import { LiM16, PFont } from "../helpers/StylingHelpers";
import { OilDilutions, StandardWeightToVolume, SolventWeights, Weight2Volume18, HerbsSolvents, StrongSolution, StandardSolution, WeakSolution } from "./Tables";

function TablesTab () {

    const panes = [
        { menuItem: 'Essential Oil Dilutions', render: () => <Tab.Pane>
            <h2>Essential Oil Dilutions</h2>
            <OilDilutions />
        </Tab.Pane>},
        { menuItem: 'Herb Solvents and Solvent Weights', render: () => <Tab.Pane>
            <h2>Herb Solvents and Solvent Weights</h2>
            <PFont>The history of herbal extraction is rich with experimentation, notably since the 1600s, involving herbalists, alchemists, and physicians. A prominent figure in this scientific exploration was John Uri Lloyd (1849-1936), recognized as an eminent pharmacist of his era and a creator of unparalleled herbal extracts. Lloyd's meticulous approach involved employing up to eight solvents on a single plant to extract what he deemed the essence of the plant.</PFont>

            <PFont>Various menstruums, or solvents, exhibit distinct extraction capabilities. For instance, water is an inadequate solvent for resins but excels at extracting carbohydrates. Alcohol proves effective for many medicinal constituents but falls short with mucilage. Glycerin, without heat and water, is suboptimal for most constituents except volatile oils. External applications commonly involve oil and fat as menstruums, while steam and carbon dioxide are employed for essential oil extraction. Both commercial and home extractions often utilize mixtures of menstruums, such as water, alcohol, glycerin, or vinegar. While standardized extracts may employ chemical solvents, this is unnecessary for homemade herbal products.</PFont>

            <PFont>Understanding the polarity of molecules is crucial in herbal extraction. Polar molecules, like water and glycerin, have positively and negatively charged regions, making them effective solvents. Alcohol, also polar, is preferable for extracting polar constituents at lower water-alcohol ratios, while higher alcohol content is better for nonpolar constituents. Fats and oils, being nonpolar solvents, excel at extracting essential oils, terpenoids, carotenoids, fat-soluble vitamins, lipids, resins, and certain alkaloids.</PFont>

            <PFont>In summary, the choice of extraction medium depends on the herb's constituents. Water, glycerin, or lower alcohol percentages are optimal for extracting carbohydrates, mucilage, glycosides, and water-soluble vitamins. In contrast, oil, higher alcohol percentages, and other nonpolar solvents are better suited for extracting essential oils, terpenoids, carotenoids, fat-soluble vitamins, lipids, resins, and specific alkaloids. The table below offers a basic guide to selecting the most suitable extraction medium based on major categories of herbs and their primary constituents.</PFont>
            <HerbsSolvents />
        </Tab.Pane>},
        { menuItem: 'Working Alcohol Ratios', render: () => <Tab.Pane>
            <h2>Working Alcohol Ratios</h2>
            <PFont>Understanding the proof system is crucial for crafting effective herbal tinctures. In this system, 80 proof equates to 40% alcohol, while 160 proof means 80% alcohol. For most home tinctures, a weak solution of 40% alcohol, often with brandy, is commonly used. However, certain herbs may benefit from a higher alcohol content, with a moderate strength solution at 60% alcohol and a strong solution at 80% alcohol.</PFont>

            <PFont>Everclear, a widely available grain alcohol with 190 proof or 95% alcohol, is suitable for crafting potent tinctures. Alternatively, organic cane or grape alcohol, available in large quantities, offers a smoother taste and a more pleasant action than grain alcohol. Collaborating with other herbalists for bulk orders can be a cost-efficient approach.</PFont>

            <PFont>When dealing with 95% alcohol, it's essential to dilute it to achieve the desired concentration. For instance, to reduce it to 40% alcohol, combine 40 parts of alcohol with water to make 95 parts. Similarly, for a 60% alcohol concentration, mix 60 parts of alcohol with water to make 95 parts. Utilizing conversion tables ensures accurate measurements, contributing to the optimal extraction of herbal properties for well-crafted tinctures.See below for examples:</PFont>
            <h2>Strong Solution</h2>
            <StrongSolution />
            <h2>Standard Solution</h2>
            <StandardSolution />
            <h2>Weak Solution</h2>
            <WeakSolution />
        </Tab.Pane>}
    ]

    return (
        <div>
            <Container  fluid >
                <h1>Helpful Tables</h1>
                <Tab menu= {{ fluid: true, vertical: true, tabular: true}} panes={panes} />
            </Container>
        </div>
    )
}

export default TablesTab