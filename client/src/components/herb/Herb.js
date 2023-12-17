import React, { useEffect, useState } from "react";
import { Image, Card, Icon, Grid, Header, Divider } from 'semantic-ui-react'
import { useParams } from 'react-router-dom';
import { StyledCardLists, GoBack, UnLinkedLists, LinkedList, MultiVarLinkedList } from "../helpers/CardHelpers";

function Herb(){
  const { id } = useParams();
  const [herb, setHerb] = useState(null)

  useEffect(() => {
    fetch(`/api/herbs/${id}`)
      .then((resp) => resp.json())
      .then((data) => setHerb(data))
    }, [id]);
    
    if (!herb) {
      return <div>Loading...</div>;
    }
  
  const dosagesList = herb.dosages.length> 0 ? 
    <MultiVarLinkedList arr={herb.dosages} url={'/dosageguide'} var1='dosage_form' var2='dosage_description' />
    : (<p style={{ color:'white' }}>No dosages listed for this herb.</p>);
    
  const herbProperties = <UnLinkedLists arr={ herb.properties } variable1={ 'name' } variable2={ 'description' } />
    
  const recipesList = herb.recipes.length > 0 ? 
    <LinkedList arr={ herb.recipes } url={ `/recipes` } />
    : <p style={{ color:'white' }}>No recipes with this herb have been created.</p>;
    
  return (
    <div>
      <GoBack />
      <Card raised fluid style= {{ backgroundColor: 'rgba(52, 52, 52, 0.8)', padding: '10px' }} className='flex-outer'>
        <Card.Content>
          <Grid columns={ 2 }>
            <Grid.Column>
              <Image src={ herb.image_url } size="big"/>
            </Grid.Column>

            <Grid.Column>
              <Header as='h1' style={{ color: 'white' }}>{ herb.name }</Header>
              <span style={{ color: 'white' }}><i>{ herb.latin_name }</i></span>

              <p style={{ color: 'white', fontSize: '12pt' }}>{ herb.description }</p>
              <Card.Description style={{ color: 'white', fontSize: '12pt' }}>
                <Icon name='warning sign' color='white' />{ herb.warnings }
              </Card.Description>
            </Grid.Column>
          </Grid>
        </Card.Content>

        <Grid columns = { 2 }>
          <Grid.Column>
            <StyledCardLists label='Herb Dosages' list={ dosagesList } />
          </Grid.Column>

          <Grid.Column>
          <StyledCardLists label='Properties' list={ herbProperties } />
          </Grid.Column>
        </Grid>

        <Divider />
        <StyledCardLists label={`Recipes with ${ herb.name }`} list={ recipesList } />
      </Card>
    </div>
  );
}

export default Herb