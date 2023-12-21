import React from "react";
import { Container, Tab } from 'semantic-ui-react';
import { LiM16, PFont, LiM14 } from "../helpers/StylingHelpers";

function EssentialOil () {
    const panes = [
        { menuItem: 'About', render: () => <Tab.Pane>
            <PFont >Aromatherapy, a specialized application of plant medicine, delves into the volatile compounds of plants, known as essential oils. These oils, responsible for the distinctive fragrances of flowers and herbs, readily evaporate at room temperature. Essential oils are derived from various plant parts, including flowers, leaves, stems, seeds, or bark. Contrary to their name, these oils lack the fatty acids present in fats and vegetable oils. Instead, they are intricate mixtures of alcohols, terpenes, terpenoids, phenols, ketones, and oxides. Soluble in fats, oils, glycerin, and high-proof alcohol, essential oils do not dissolve in water.</PFont>

            <h2>Historical Roots: Aromatherapy's Evolution</h2>

            <PFont >The term "aromatherapy" was coined by Professor René-Maurice Gattefossé, a French chemist who conducted experiments during World War I. His research showcased the superior detoxifying and wound-healing properties of essential oils, notably lavender, compared to chemical antiseptics.</PFont>

            <h2>Aromatherapy in Modern Healthcare</h2>

            <PFont >Widely embraced in Europe, aromatherapy has found its way into medical practices. In England, the soothing aroma of lavender uplifts patient morale in hospital wards, promoting faster healing. Essential oils are gaining popularity in the United States, with an increasing number of companies promoting their use.</PFont>

            <h2>Effects on the Nervous and Glandular Systems</h2>

            <PFont >Essential oils exhibit diverse benefits, with repeated applications maintaining their effectiveness. Primarily influencing the nervous and glandular systems, essential oils possess mood-altering capabilities. The unique wiring of the sense of smell directly into the brain allows these oils to impact hormone production and the autonomic nervous system, regulating vital functions like digestion, heart rate, blood pressure, and breathing.</PFont>

            <h2>Essential Oils and Mood: A Neurological Dance</h2>

            <PFont >The amygdala, hippocampus, and hypothalamus are directly affected by odors, leading to mood alterations. Marketers leverage this phenomenon, as seen in studies where scented showrooms enhanced customer preferences. Japanese companies use citrus scents to boost workplace alertness and concentration.</PFont>

            <h2>Applications and Physical Healing Properties</h2>

            <PFont >Essential oils extend beyond mood modulation, demonstrating infection-fighting capabilities. With antibacterial, antiviral, antifungal, and antiparasitic actions, they stimulate metabolic processes, enhancing wound healing, white blood cell counts, digestion, energy production, and circulation. Absorbed through the sinuses and skin, essential oils influence various organs, demonstrating their systemic impact.</PFont>

            <h2>Utilitarian Uses: From Skincare to Pest Control</h2>

            <PFont >Practical applications of essential oils include skincare products, mouthwashes, deodorants, and home disinfectants. Their versatility extends to perfumes, air fresheners, and insect repellents.</PFont>
        </Tab.Pane>},
        { menuItem: 'Variations', render: () => <Tab.Pane>
            <h2>Aromatherapy Methods: Varied Applications</h2>

            <PFont >Aromatherapy embraces diverse application methods, including:</PFont>
            <ul>
                <LiM16 >Topical Application:</LiM16>
                    <ul>    
                        <LiM14  >Dilute essential oils with fixed vegetable oils, natural soaps, or lotions for safe topical use. Neat application, reserved for non-irritating oils, can aid wound healing.</LiM14>
                    </ul>
                <LiM16>Diffusion:</LiM16>
                    <ul>
                        <LiM14  >Disperse oils into the air for mood enhancement, air freshening, and microbial control. Diffusers and steam inhalation provide effective diffusion methods.</LiM14>
                    </ul>
                <LiM16 >Internal Use:</LiM16>
                    <ul>
                        <LiM14  >Reserved for trained aromatherapists, internal use requires caution and proper dilution. Generally recognized as safe (GRAS) oils should be used, ensuring meticulous dilution to prevent mucosal irritation.</LiM14>
                    </ul>
                <LiM16 >Baths and Soaks:</LiM16>
                    <ul>
                        <LiM14  >Add essential oils to baths or foot/hand soaks for relaxation, pain relief, and various therapeutic benefits. Dilution in unscented liquid soap aids oil dispersion.</LiM14>
                    </ul>
                <LiM16 >Perfumes:</LiM16>
                    <ul>
                        <LiM14  >Craft personalized perfumes by blending essential oils with carrier oils for topical application.</LiM14>
                    </ul>
                <LiM16 >Aromatherapy Sprays:</LiM16>
                    <ul>
                        <LiM14 >Create air fresheners and purifiers using essential oils blended with water and vegetable glycerin.</LiM14>
                    </ul>
            </ul>
            <h2>Safety Precautions: A Necessity in Aromatherapy</h2>
            <PFont >While essential oils are available over the counter, their misuse can lead to skin irritation or severe reactions.</PFont>
            <ul>
                <LiM16>Professional Guidance:</LiM16>
                    <ul>
                        <LiM14 >Consult a qualified aromatherapist before using undiluted oils, especially during pregnancy, or for those with blood pressure issues or allergies.</LiM14>
                    </ul>
                <LiM16>Internal Use Caution:</LiM16>
                    <ul>
                        <LiM14>Internal use of essential oils should be approached with care. Only use GRAS oils, ensuring proper dilution to prevent adverse effects.</LiM14>
                    </ul>
                <LiM16>Quality Matters:</LiM16>
                    <ul>
                        <LiM14 >Ensure the quality of essential oils by purchasing from reputable manufacturers. Reports of serious reactions emphasize the importance of respectful and informed usage.</LiM14>
                    </ul>
            </ul>

            <h2>Flower Essences: Healing on an Emotional Plane</h2>

            <PFont >Flower essences, akin to homeopathic remedies, focus on emotional healing using the vibrational energy of flowers. Dr. Edward Bach, a medical doctor and homeopath, crafted the first thirty-eight flower essence remedies. Bach's philosophy centered on emotional conflicts disrupting harmony between the soul and mind, eventually leading to physical illness.</PFont>

            <h2>Understanding Plant Personalities: Vibrational Teaching</h2>

            <PFont >Every healing plant embodies a conflict overcome in its environment. Flower essences capture the plant's vibration, imparting positive energy to individuals. By imbibing this vibration, one learns to cope with life in a harmonious manner, fostering emotional balance.</PFont>

            <h2>Flower Essence Creation and Application</h2>

            <PFont >Flower essences are prepared by soaking flowers in spring water, preserving the strained water with brandy. Dilution in a homeopathic fashion imprints the plant's vibration into the remedy. Ingesting flower essences floods the body with positive vibrations, breaking emotional blocks, fostering awareness, and facilitating constructive life changes.</PFont>

            <h2>Embracing Emotional Harmony</h2>

            <PFont >As an energy medicine, flower essences contribute to balanced emotional states, promoting inner peace and happiness. With an expansive array of flower essences available, individuals can address a spectrum of emotional issues, making them valuable tools for emotional well-being.</PFont>
        </Tab.Pane> }
    ]
    return (
        <div>
            <Container  fluid >
        <h1>Essentials oils and aromatherapy</h1>
        <Tab menu= {{ fluid: true, vertical: true, tabular: true}} panes={panes} />
        <PFont > </PFont>
        <PFont > </PFont>

        </Container>
        </div>
    )
}

export default EssentialOil