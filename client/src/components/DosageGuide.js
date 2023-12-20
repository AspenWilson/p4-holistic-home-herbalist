import React, { useState } from 'react'
import { Tab } from 'semantic-ui-react'
import "../index.css"
import { dosageTabs } from './helpers/GeneralHelpers';
import MainGuide from './dosages/MainGuide';
import Capsules from './dosages/Capsules';
import Decoctions from './dosages/Decoctions';
import Dried from './dosages/Dried';
import EssentialOil from './dosages/EssentialOil';
import Extracts from './dosages/Extracts';
import Fresh from './dosages/Fresh';
import Glycerite from './dosages/Glycerite';
import Infusions from './dosages/Infusions';
import Salve from './dosages/Salve';
import Syrup from './dosages/Syrup';
import Tincture from './dosages/Tincture';
import Topical from './dosages/Topical';
import TablesTab from './dosages/TablesTab';

function DosageGuide() {
    const [activeTab, setActiveTab] = useState('Dosage Guidance')

    const panes = [
        { menuItem: 'Dosage Guidance', render: () => dosageTabs(<MainGuide />)},
        { menuItem: 'Capsules', render: () => dosageTabs(<Capsules />)},
        { menuItem: 'Decoctions', render: () => dosageTabs(<Decoctions />)},
        { menuItem: 'Dried', render: () => dosageTabs(<Dried />)},
        { menuItem: 'Essential Oil', render: () => dosageTabs(<EssentialOil />)},
        { menuItem: 'Extracts', render: () => dosageTabs(<Extracts />)},
        { menuItem: 'Fresh', render: () => dosageTabs(<Fresh />)},
        { menuItem: 'Glycerite', render: () => dosageTabs(<Glycerite />)},
        { menuItem: 'Infusions', render: () => dosageTabs(<Infusions />)},
        { menuItem: 'Salve', render: () => dosageTabs(<Salve />)},
        { menuItem: 'Syrup', render: () => dosageTabs(<Syrup />)},
        { menuItem: 'Tincture', render: () => dosageTabs(<Tincture />)},
        { menuItem: 'Topical', render: () => dosageTabs(<Topical />)}, 
        { menuItem: 'Tables', render: () => dosageTabs(<TablesTab />)},
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

export default DosageGuide