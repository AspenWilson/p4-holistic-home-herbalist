import React from "react";
import { Container, Tab, Card } from 'semantic-ui-react';
import TermsTab from "./Terms";
import EquipmentTab from "./Equipment";
import { LiM16, PFont } from "../helpers/StylingHelpers";
import { WeightDosageChart, AgeDosageChart, IllnessChart } from "./Tables";

function MainGuide () {

    const panes = [
        {menuItem: 'Determining Dosages', render: () => <Tab.Pane>
            <h2>Choosing the right dosage</h2>
            <PFont >While each herb listed in our database has recommended dosages listed, you should always be sure to check the properties of the herb, view it's warnings, and consult a doctor before beginning any new health or medicinal remedy. You should also tailor dosages based on age and current health status. To make this process a bit easier, we have provided some dosage strategies in the tables below. </PFont>
            <PFont >The administration of herbal extracts demands a nuanced approach, acknowledging the inherent diversity among individuals. While the standard dose for an average adult typically stands at 6 grams per day, divided into multiple doses, it is crucial to recognize that this figure may not universally apply. The cardinal principle guiding herbal dosing emphasizes the uniqueness of each person, necessitating an individualized treatment strategy. </PFont>
        </Tab.Pane>},
        {menuItem: 'Timing and Administration', render: () => <Tab.Pane>
            <h2 >Timing and Administration: </h2>
            <ul>
                <LiM16>Ideally, consume herbal extracts on an empty stomach, either an hour before meals or two hours after meals.</LiM16>
                <LiM16>Exceptions exist for heat-clearing and purgative herbs, which can be taken with meals if they tend to upset the stomach.</LiM16>
                <LiM16>Maintain a minimum gap of 2 hours between herbal intake and prescription medications or other supplements.</LiM16>
            </ul>

            <h2 >Administration Medium: </h2>
            <ul>
                <LiM16>Serve herbal extracts with warm water to enhance their efficacy.</LiM16>
                <LiM16>For granules, dissolve them in warm water, resembling the preparation and consumption of tea. Notably, granules may not dissolve well in cold or hot water, leading to potential clumping.</LiM16>
            </ul>

            <h2 >Avoid Mixing with Other Substances: </h2>
            <ul>
                <LiM16>Consume herbal extracts solely with warm water, refraining from combining them with juice, coffee, tea, or any other substances. Such combinations can alter the properties of the herbs, affecting their intended impact.</LiM16>
            </ul>

            <h2 >Caution with Dosage Adjustment: </h2>
            <ul>
                <LiM16>In cases of acute or severe conditions, dosage adjustments may be necessary. Some herbal formulas might require an increase, possibly up to 20 grams per day for a limited duration.</LiM16>
                <LiM16>Recognize the diversity among individuals. The "one size fits all" approach doesn't hold in herbal dosing. Each person's response to herbs is unique.</LiM16>
            </ul>

            <h2 >Individualized Approach: </h2>
            <ul>
                <LiM16>Embrace the principle that every person is distinct and should be treated as such. There is no universal dosage that suits everyone.</LiM16>
                <LiM16>When in doubt, initiate with a lower dose and gradually escalate until the desired therapeutic effect is achieved. This cautious approach minimizes the risk of adverse reactions and allows for a personalized adjustment based on individual responses.</LiM16>
            </ul>
        </Tab.Pane>},
        {menuItem: 'Dosage Charts', render: () => <Tab.Pane>
            <h2 >Adjusting Dosage by Weight </h2>
            <WeightDosageChart />
            <h2>Adjusting Dosage by Age </h2>
            <AgeDosageChart />
        </Tab.Pane>},
        {menuItem: 'Expected Results', render: () => <Tab.Pane>
            <h2>Expected results when using herbal medicines</h2>
            <PFont >Understanding the expected results of herbal medicine is essential for effective treatment. Here are general guidelines based on the nature and duration of illnesses: </PFont>
            <IllnessChart />
        </Tab.Pane>},
        {menuItem: 'Additional Considerations', render: () => <Tab.Pane>
            <h2 >Additional Considerations:</h2>
            <ul>
                <LiM16 ><strong>Consistency is Key:</strong> Regular and consistent dosing is crucial, especially for chronic and degenerative conditions.</LiM16>
                <LiM16><strong>Individual Variations:</strong> Responses to herbal treatments can vary among individuals, and these guidelines provide general expectations. Adjustments may be necessary based on personal reactions.</LiM16>
                <LiM16><strong>Holistic Approach:</strong> Complement herbal treatments with overall lifestyle improvements, including nutrition, rest, and stress management, for enhanced effectiveness.</LiM16>
                <LiM16><strong>Consultation:</strong> In complex or severe cases, seeking guidance from a qualified herbalist or healthcare professional is advisable. They can provide personalized recommendations based on individual health conditions.</LiM16>
            </ul>
            <PFont >It's important to note that herbal medicine often takes a holistic approach, addressing the root cause of the ailment rather than merely alleviating symptoms. Patience and commitment to the recommended dosages and lifestyle adjustments contribute significantly to the success of herbal treatments.</PFont>
        </Tab.Pane>},
        {menuItem: 'Terms', render: () => <Tab.Pane>
            <Card.Group>
                <TermsTab />
            </Card.Group>
        </Tab.Pane>},
        {menuItem: 'Equipment', render: () => <Tab.Pane><EquipmentTab /></Tab.Pane>}
    ]

    return (
        <div>
            <Container  fluid >
                <Tab menu= {{ fluid: true, vertical: true, tabular: true }} panes={panes} />
            </Container>
        </div>
    )
}

export default MainGuide