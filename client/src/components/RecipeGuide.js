import React, { useState } from 'react';
import { Tab } from 'semantic-ui-react';
import "../index.css";
import { PFont, LiM16, LiM14 } from './helpers/StylingHelpers';

function RecipeGuide() {
    const [activeTab, setActiveTab] = useState('Creating Effective Herbal Formulas')

    const panes = [
        { menuItem: 'Creating Effective Herbal Formulas', render: () => <Tab.Pane>
            <h2>Creating Effective Herbal Formulas</h2>
            <PFont>Creating herbal formulas requires more than just combining a variety of herbs traditionally used for a particular health issue. Successful herbal formulations consider the principles of herbal energetics, understanding how herbs interact and enhance or counteract each other's effects.</PFont>
        </Tab.Pane>},
        { menuItem: 'Herbal Energetics', render: () => <Tab.Pane>
            <h2>Herbal Energetics: The Foundation</h2>
            <PFont>Herbs possess energetic qualities influencing the body in specific directions. Understanding this is crucial for formulating effective blends. Key considerations include:</PFont>
            <ul>
                <LiM16><strong>Metabolic Direction:</strong> Herbs can be warming, cooling, or neutral, influencing heat and inflammation. Warming herbs counteract depression and coldness, while cooling herbs reduce excess heat.</LiM16>
                <LiM16><strong>Fluid Balance:</strong> Herbs can dry or moisten the body, addressing stagnation or atrophy. Drying herbs reduce excess fluids, while moistening herbs restore flexibility to dry tissues.</LiM16>
                <LiM16><strong>Muscle Tone:</strong> Herbs can relax or tighten tissues. Relaxing herbs ease spasms and promote flow, while constricting herbs tone tissues.</LiM16>
                <LiM16><strong>Nutrition:</strong> Some herbs primarily provide nutrients, aiding the body's healing process without strong directional effects.</LiM16>
            </ul>
        </Tab.Pane>},
        { menuItem: 'Designing Formulas', render: () => <Tab.Pane>
            <h2>Designing Formulas: A Systematic Approach</h2>
            <PFont>Begin by deciding the primary energetic quality you want the formula to have—warming, cooling, drying, moistening, relaxing, or nourishing.</PFont>
            <PFont>Consider the organs and body systems you wish to target. Design formulas for specific systems or properties, such as digestive, respiratory, nervous, or circulatory.</PFont>
        </Tab.Pane>},
        { menuItem: 'Components of a Formula', render: () => <Tab.Pane>
            <h2>Components of Formulas</h2>
            <ul>
                <LiM16><strong>Key Herbs:</strong> These have the primary action you desire. Select based on energetics, organ affinity, or specific properties.</LiM16>
                <LiM16><strong>Supporting Herbs:</strong> Optional ingredients that harmonize the formula, reducing side effects or undesirable flavors.</LiM16>
                <LiM16><strong>Balancing or Harmonizing Herbs:</strong> Herbs can relax or tighten tissues. Relaxing herbs ease spasms and promote flow, while constricting herbs tone tissues.</LiM16>
                <LiM16><strong>Catalysts:</strong> Herbs that activate the formula, often aromatic or pungent, helping the formula work more quickly.</LiM16>
                <LiM16><strong>Determining Parts:</strong> Assign parts to each herb based on weight. For example:</LiM16>
            <ul>
                <LiM14>1-2 key herbs (8-16 parts each)</LiM14>
                <LiM14>2-4 supporting herbs (4-8 parts each)</LiM14>
                <LiM14>0-3 balancing herbs (2-4 parts each)</LiM14>
                <LiM14>0-2 catalysts (1-2 parts each)</LiM14>
            </ul>
            </ul>
            <PFont>By following this systematic approach, herbalists can craft well-balanced formulas with targeted actions, ensuring a holistic and effective approach to herbal medicine.</PFont>
        </Tab.Pane>}
    ]

    return (
        <Tab 
            menu={{ fluid: true, tabular: true, pointing: true }}
            panes={ panes }
            activeIndex={ panes.findIndex((pane) => pane.menuItem === activeTab)}
            onTabChange={(_, data) => setActiveTab(data.panes[data.activeIndex].menuItem)}
        />
    )
}

export default RecipeGuide
