import React from 'react';
import { useHistory, Link } from 'react-router-dom';
import { Card, Button, Icon, List, Popup, Label } from 'semantic-ui-react';
import { filterAlphabetically } from './GeneralHelpers';
import { StyledCardDescription } from './StylingHelpers';

// Herb Lists

export const StyledCardLists = ({ label, list }) => {
    return (
        <Card.Content extra style={{ padding:'10px'}}>
            <StyledCardDescription style={{ color:'white' }}>{ label }:</StyledCardDescription>
            { list }
        </Card.Content>
    )
}

export const GoBack = () => {
    const history = useHistory()
    const goBack = () => {
        history.goBack()
    }
    return (
        <Button 
            icon 
            style={{ backgroundColor: 'black', color:'white', fontSize: '14pt'}} 
            labelPosition='left' 
            onClick={ goBack }
        >
            <Icon color='white' name='backward' />
            Go Back
        </Button>
    )
}

export const UnLinkedLists = ({ arr, variable1, variable2 }) => {
    return arr.map((item) => (
            <List key={ item.id } style={{ color:'white', fontSize: '14pt'}}>
                <List.List>
                    <List.Header style={{ fontWeight: 'bold' }}><Icon name='right triangle' />{ item[variable1] }
                    </List.Header>
                    <ul>
                        <li >{ item[variable2] }</li>
                    </ul>
                </List.List>
            </List>
        )
    )
}

export const MultiVarLinkedList = ({ arr, url, var1, var2 }) => {
    return arr.map((item) => (
        <List key={item.id} style={{ color:'white', fontSize: '14pt'}}>
            <List.List>
                <Link to={ url } style={{ fontWeight: 'bold',color:'white' }}><Icon name='right triangle' />{ item[var1] }
                </Link>
                <ul>
                    <li >{ item[var2] }</li>
                </ul>
            </List.List>
        </List>
    ))
}

export const LinkedList = ({ arr, url }) => {
    return arr.map((item) => (
        <List key={ item.id } style={{ color:'white', fontSize: '14pt'}}>
            <List.List>
                <Link to={ url+`/${item.id}` } style={{ fontWeight: 'bold',color:'white' }}><Icon name='right triangle' />{ item.name }
                </Link>
            </List.List>
      </List>
    ))
}

// Recipe Lists

export const RecipeUnLinkedList = ({ arr, name }) => {
    return arr.map((item) => (
          <Card raised key={item.id} >
            <Card.Header style={{ color: 'black', padding:'10px' }} as='h3'>{item.herb.name}, <small>{item.herb_type}</small></Card.Header>
            <Card.Description style={{color: 'black', padding:'10px'}}>Amount: {item.amount} {item.amount_type}</Card.Description>
            <Card.Content style={{color: 'black'}}>
              <Icon name='warning sign' color='white' /> {item.herb.warnings}
            </Card.Content>
            <Button fluid as={ Link } to={`/herbs/${item.herb_id}`} style={{ backgroundColor: '#056d52', color:'white' }}>See {name} Details</Button>
          </Card>
        )
    )}


// Property Tags

export const propertyTags = (arr) => {
    const filteredArr = filterAlphabetically(arr)
    return filteredArr.map((property) => (
        <Popup key={property.id} content={property.description} trigger={
            <Label style={{backgroundColor: '#056d52', color:'white'}} tag key={property.id}>
                {property.name}
            </Label>}
        />
    ));
};