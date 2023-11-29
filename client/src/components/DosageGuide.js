import React, { useState, useContext } from 'react'
import { Tab, Grid, Header } from 'semantic-ui-react'
import { AppContext } from '../context/AppContext';
import "../index.css"
import { dosageTabs } from './helpers/GeneralHelpers';
import Capsules from './dosages/Capsules';
import Decoctions from './dosages/Decoctions';
import Dried from './dosages/Dried';
import EssentialOil from './dosages/EssentialOil';
import Extracts from './dosages/Extracts';
import Fresh from './dosages/Fresh';
import Glycerite from './dosages/Glycerite';
import Infusions from './dosages/Infusions';
import Oil from './dosages/Oil';
import Powder from './dosages/Powder';
import Salve from './dosages/Salve';
import Syrup from './dosages/Syrup';
import Tincture from './dosages/Tincture';
import Topical from './dosages/Topical';

function DosageGuide() {
    const [activeTab, setActiveTab] = useState('Capsules')

    const panes = [
        { menuItem: 'Capsules', render: () => dosageTabs(<Capsules />)},
        { menuItem: 'Decoctions', render: () => dosageTabs(<Decoctions />)},
        { menuItem: 'Dried', render: () => dosageTabs(<Dried />)},
        { menuItem: 'Essential Oil', render: () => dosageTabs(<EssentialOil />)},
        { menuItem: 'Extracts', render: () => dosageTabs(<Extracts />)},
        { menuItem: 'Fresh', render: () => dosageTabs(<Fresh />)},
        { menuItem: 'Glycerite', render: () => dosageTabs(<Glycerite />)},
        { menuItem: 'Infusions', render: () => dosageTabs(<Infusions />)},
        { menuItem: 'Juice', render: () => dosageTabs(<Capsules />)},
        { menuItem: 'Oil', render: () => dosageTabs(<Oil />)},
        { menuItem: 'Powder', render: () => dosageTabs(<Powder />)},
        { menuItem: 'Salve', render: () => dosageTabs(<Salve />)},
        { menuItem: 'Syrup', render: () => dosageTabs(<Syrup />)},
        { menuItem: 'Tincture', render: () => dosageTabs(<Tincture />)},
        { menuItem: 'Topical', render: () => dosageTabs(<Topical />)}
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