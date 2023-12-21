import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import { Image, Card, Icon, Grid, Header, Divider } from 'semantic-ui-react';
import HerbEmailModal from "../modals/HerbEmailModal";
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
      <HerbEmailModal herb={herb}/>
      <Card raised fluid style= {{ backgroundColor: 'rgba(52, 52, 52, 0.8)', padding: '20px' }} className='flex-outer'>
          <Grid columns={ 2 }>
            <Grid.Column width={6}>
              <Image src={ herb.image_url } size="big"/>
            </Grid.Column>

            <Grid.Column width={10}>
              <Header as='h1' style={{ color: 'white' }}>{ herb.name }</Header>
              <span style={{ color: 'white' }}><i>{ herb.latin_name }</i></span><br/><br/>

              <p style={{ color: 'white', fontSize: '14pt' }}>{ herb.description }</p><br/>
              <Card.Description style={{ color: 'white', fontSize: '14pt' }}>
                <Icon name='warning sign' color='white' /> { herb.warnings }
              </Card.Description>
            </Grid.Column>
          </Grid>
        <Divider />
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