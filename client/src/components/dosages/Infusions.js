import React from "react";
import { Container, Tab } from 'semantic-ui-react'
import { LiM16, PFont } from "../helpers/StylingHelpers";


function Infusions () {
       const panes = [
              { menuItem: 'About', render: () => <Tab.Pane>
                     <PFont >Water stands as the oldest extraction medium for herbs, providing a simple and straightforward method to transform herbs into liquid form through two primary techniques: infusions and decoctions.  </PFont>
                     <PFont >Infusions, also known as herbal teas or tisanes, involve pouring boiling water over an herb and allowing it to steep for a determined time before straining. Cold infusions, where the herb is soaked in water, are also an option, particularly for delicate plant parts like flowers and leaves. Infusions are commonly used for aromatic and more pleasant-tasting herbs. In contrast, decoctions differ from infusions as the herb is simmered in water. This process involves bringing water to a boil, adding the herbs, reducing heat, and simmering for a specified period.  </PFont>
                     <PFont > Decoctions effectively draw out constituents less readily released from plant material, extracting more minerals, tannins, and bitter principles than infusions. Both methods are cost-effective, easy to prepare, and provide an efficient means of ingesting herbs. They can be stored in the refrigerator for several days and consumed as needed, allowing the body's senses to regulate the appropriate dosage. However, teas and decoctions may not be suitable for herbs with unpleasant tastes, and certain constituents are not water-soluble. Despite these limitations, they remain fundamental in herbal extractions. </PFont>
                     <PFont >Herbal teas serve as an excellent introduction to the world of herbal remedies due to their simplicity and ease of preparation. Whether made from fresh, dried, or powdered herbs, both hot and cold infusions are versatile and accessible. The term "tisane", a French word for tea, is often used interchangeably with infusion. These teas are not only cost-effective but also require minimal time to prepare. </PFont>
                     <PFont >Infusions offer a pleasant method of ingesting herbs, although their palatability may decrease with herbs possessing disagreeable flavors. Certain constituents, particularly bitter and astringent principles, may not be fully released in a simple tea, necessitating more potent infusions or decoctions. It's crucial to cover the container during steeping to retain aromatic principles. </PFont>
              </Tab.Pane>},
              { menuItem: 'Instructions', render: () => <Tab.Pane>
                     <PFont >Infusions find applications in topical use, such as rinses, compresses, and foot soaks. They may consist of a single ingredient or a combination and can be consumed hot or cold, inhaled as a vapor, used for perfuming, or added to baths.</PFont>
                     
                     <h2>Hot infusions:</h2>
                     <PFont >For hot infusions, ideal for leaves and flowers, boiled water is poured over the herb and steeped for at least 15 minutes. Sweeteners or additional herbal flavors can be added. Infusions should be made fresh daily or refrigerated for up to three days. Water with high lime content may hinder extraction, and adding vinegar or lemon juice can enhance it. The more finely herbs are chopped or powdered, the more potent the tea.</PFont>
                     
                     <h2>Cold infusions:</h2>
                     <PFont >For a cold infusion, suitable for herbs with volatile constituents, soak 15 grams of herb in 1 liter of cold water for 8-12 hours, then strain and drink. Fresh infusions should be made daily. Cold infusions are beneficial for herbs sensitive to heat or with highly volatile constituents.</PFont>
                     
                     <h2>Infusion variations (for hot and cold):</h2>
                     <ul>
                            <LiM16 ><strong>NOTE:</strong> Steeping times vary based on desired strength</LiM16>
                            <LiM16 ><strong>Weak infusion:</strong> Use 15 grams of herb per liter of water, steeping leaves for 1 hour, flowers for 30 minutes, crushed seeds for 15 minutes, and bark and roots for 4 hours.</LiM16 >
                            <LiM16 > <strong>Standard Infusion:</strong> Steep 30 grams of herb in 1 liter of hot water for 30-60 minutes.</LiM16 >
                            <LiM16 ><strong>Strong Infusion:</strong> Make a standard infusion and steep for 8 hours.</LiM16 >
                     </ul>
                     
              </Tab.Pane> }
          ]
    return (
        <div>
            <Container  fluid >
        <h1>Infusions</h1>
        <Tab menu= {{ fluid: true, vertical: true, tabular: true}} panes={panes} />

        
        
        <PFont > </PFont>
        <PFont > </PFont>

        </Container>
        </div>
    )
}

export default Infusions