import React, { useState } from "react";
import { Container, Tab } from 'semantic-ui-react'
import { StyledSelect, LiM16, PFont } from "../helpers/StylingHelpers";
import { topicalDrops } from "../helpers/FormHelpers";


function Topical () {
    const [selectedOption, setSelectedOption] = useState('')

    const displayedInstructions = 
        selectedOption === 'Butters' ? 
            (<>
            <h2>Butters</h2>
            <PFont > Body butters, a whipped blend of saturated oils (solid at room temperature) and monounsaturated or polyunsaturated oils (liquid at room temperature), offer a creamy-smooth feel without the need for emulsifiers. While body butters typically do not contain water, they can include hydrosols or aloe vera gel, requiring the addition of an emulsifier. Crafting a butter involves slowly melting solid and liquid oils together, incorporating essential oils for fragrance, and whipping the mixture into a buttery consistency. </PFont></>) :
        selectedOption === 'Compresses and Soaks' ?
            (<>
            <h2>Compresses and Soaks</h2>
            <PFont>Compresses, involving the soaking of a cloth in herbal tea or decoction and subsequent application to the affected area, can be a soothing remedy. Similarly, soaks, submersing an area in an herbal tea or decoction, provide a therapeutic solution.

            With a few days of healing, if wounds show no signs of infection, salves emerge as a more convenient option compared to poultices and compresses. Salves, particularly effective during the proliferative and remodeling phases of tissue healing, offer a practical and easy-to-use form of herbal application.</PFont></>) :
        selectedOption === 'Liniments' ?
            (<>
            <h2>Liniments</h2>
            <PFont>Liniments, akin to macerated tinctures but utilizing rubbing alcohol, are often preferred for cost efficiency. Liniments, used topically, are not meant for internal consumption. Adding menthol crystals or wintergreen enhances both the aroma and anti-inflammatory properties of the liniment.</PFont></>):
        selectedOption === 'Lotions' ?
            (<>
            <h2>Lotions</h2>
            <PFont>Lotions, characterized by their emulsified blend of oil and water, require an emulsifier for stability. Popular commercial lotions often contain processed chemical emulsifiers, but a safer alternative is emulsifying wax or a homemade emulsifier. Given that lotions contain water, which facilitates bacterial and mold growth, the inclusion of a preservative, such as rosemary essential oil or vitamin E oil, becomes essential. Crafting a lotion involves melting together liquid and solid fixed oils, an emulsifier, and an herbal infusion, aloe vera juice, or hydrosol.</PFont></>) :
        selectedOption === 'Massage Oils' ?
            (<>
            <h2>Massage Oils</h2>
            <PFont>Massage oils, blending carrier oils with essential oils, provide a dual benefit of fragrance and therapeutic action. These oils contribute to stress relief, tension reduction, improved skin cell growth, and activation of the lymphatic system. Depending on the person and oils used, massage oils can have either a relaxing or stimulating effect on the mind and spirit.</PFont></>) :
        selectedOption === 'Oil Extractions' ?
            (<>
            <h2>Oil Extractions:</h2>
            <PFont>Extracting herbs in oil involves macerating them in fixed oils, such as olive, grape seed, almond, peanut, or apricot oil. However, oil, on its own, has limited solvency, prompting the use of gentle heat or an intermediate solvent like alcohol to enhance the extraction process.</PFont>
            <h2> Cold Extractions:</h2>
            <ul>
                <LiM16>Pack herbs loosely in a glass jar, covering them with oil, and allowing the mixture to sit for 14 days in a warm, dark area.</LiM16>
            </ul>
            <h2> Hot Extractions:</h2>
            <ul>
                <LiM16>Maintain heat between 122° and 140° for medicinal oils.</LiM16>
                <LiM16>Slow cooker or oven methods, with a temperature not exceeding 150°, are recommended.</LiM16>
                <LiM16>Extract herbs in oil overnight or for 8-12 hours, then strain and bottle.</LiM16>
            </ul>
            <h2>Intermediate Solvents:</h2>
            <ol>
                <LiM16>Combine plant material with 75% of its weight in 95% alcohol. </LiM16>
                <LiM16>After 24 hours, add oil at a 1:5 ratio and apply gentle heat for 8-12 hours.</LiM16>
                <LiM16>Evaporate all alcohol, resulting in a more potent oil.</LiM16>
            </ol>
            </>) :
        null


    const panes = [
        { menuItem: 'About', render: () => <Tab.Pane>
            <PFont >Oil-based herbal preparations, revered for their efficacy in addressing minor skin issues such as abrasions, burns, rashes, and dry skin, constitute a vital aspect of traditional herbalism. Although these formulations can offer remarkable benefits, it is crucial to exercise caution, especially with new cuts or wounds, as oil has the potential to trap bacteria and facilitate their spread. In cases of active infections, direct applications such as poultices, compresses, and soaks are often more suitable. </PFont>
        </Tab.Pane>},
        { menuItem: 'Instructions', render: () => <Tab.Pane>
            <>
            <StyledSelect 
                classNamePrefix="Select"
                options={ topicalDrops }
                onChange={(data) => setSelectedOption(data.value)}
            />
            <br />
            {displayedInstructions}
            </>
        </Tab.Pane> }
    ]

    return (
        <div>
            <Container  fluid >
        <h1>Topicals</h1>
        <Tab menu= {{ fluid: true, vertical: true, tabular: true}} panes={panes} />
        
        <PFont > </PFont>
        <PFont > </PFont>
        <PFont > </PFont>
        

        </Container>
        </div>
    )
}

export default Topical