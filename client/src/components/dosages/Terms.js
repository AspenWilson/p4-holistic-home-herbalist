import React from "react";
import { Card } from 'semantic-ui-react'
import { LiM16, PFont } from "../helpers/StylingHelpers";

function TermsTab () {
    const terms= [
        {   "term": "Decanting",   "definition": "The process of pouring off the menstruum from one container to another, often through a filtering cloth or paper, without disturbing the sediment at the bottom of the container." },
        {   "term": "Garbling",   "definition": "The process of removing stems, diseased plant parts, and critters from freshly harvested plant material. This improves the quality of the medicine being made." },
        {   "term": "Maceration",   "definition": "A way to make tinctures. Macerating herbs means you soak the marc in the menstruum for a set period of time that varies from process to process. Maceration allows the menstruum to become saturated with constituents from the marc." },
        {   "term": "Maceration container",   "definition": "A leak-proof container, usually glass but sometimes stainless steel, that is used in the maceration process. Glass canning jars are commonly used by home medicine makers. They come in a wide assortment of sizes (half pints, pints, quarts, and even half gallons) and are relatively inexpensive. When using mason jars place a single layer of parchment paper between the lid and jar to keep your extract from interacting with the metal in the lid. Many solvents can cause metal corrosion, which will adversely affect your extract." },
        {   "term": "Marc",   "definition": "The solid matter (plant material) in your preparation. This marc is mixed with the menstruum for extraction. After the extraction process, the plant material is called the exhausted marc. Marc is measured by weight. Again, you can use metric or US measures; just make sure you use the same standard of measurement for the marc that you're using for the menstruum." },
        {   "term": "Menstruum (solvent)",   "definition": "An old alchemical term for a substance that dissolves a solid or holds it in suspension. The modern scientific term is solvent. Although many herbalists confine the term \"menstruum\" to alcohol extractions, technically anything that you use as a solution to extract the herbs is a menstruum, including water, alcohol, glycerin, vinegar, and simple syrups. Menstruums are measured in fluid volume. The choice to use metric units (liters, milliliters), fluid ounces, or the more standard US measures (cups, pints, quarts) is a personal one. Choose one and stick with it." },
        {   "term": "Precipitation",   "definition": "Occurs when solid particles fall out of solution in a tincture or extract. This most commonly occurs when a tincture hasn't been filtered properly, or when the extract is exposed to light or drastic temperature changes. Precipitation will occur in most tinctures as they age, but if you've made the tincture or extract properly, it should not occur for many years. Mild precipitation can be fixed by decanting the tincture into a clean container. If massive precipitation occurs along with a change in color or taste, it's time to discard the tincture and start again." },
        {   "term": "Solubility",   "definition": "The ability of the menstruum to extract various constituents from a plant into a liquid form. Solubility depends on many factors, including the polarity (electrical charge) of the substance, pH, temperature, and the presence of other constituents or compounds in the plant. Solubility is difficult to determine, but herbalists have the cumulative experience of other herbalists as well as some science to determine the best solvents for particular plants." },
        {   "term": "Succussion",   "definition": "An old word for shaking. Maceration extracts are succussed to ensure complete contact between the marc and the menstruum. In dry herb macerations, succussion is an essential part of the process. Agitation moves particles that clump at the bottom of the container back into contact with the menstruum. Succussion isn't normally required for fresh herb macerations; the high-proof alcohol used in fresh plant preparations dehydrates the plant cells, pulling all of the constituents out of the plant and into solution." }
    ]

   const TermListings = () => {
    return terms.map((term, index) => (
        <Card key={index} raised>
            <Card.Content>
                <Card.Header>{term.term}</Card.Header>
                <Card.Description>{term.definition}</Card.Description>
            </Card.Content>
        </Card>
    ))
   }

   return (
        <TermListings />
   )


}

export default TermsTab