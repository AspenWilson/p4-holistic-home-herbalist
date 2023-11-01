import React from 'react'
import { Tab } from 'semantic-ui-react'


export const tabPane = (arr, component, msg) => (
        <Tab.Pane attached={false}>
            {arr.length > 0 ? (
                <>
                {component}
                </>
            ) : (<h3>{msg}</h3>)}
        </Tab.Pane> 
    )
