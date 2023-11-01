import React, {useEffect, useState} from "react";
import { Image, Card, Button, Icon, Grid, Header, List, Divider } from 'semantic-ui-react'
import { useParams, useHistory, Link } from 'react-router-dom';
import { StyledCardDescription } from "./helpers/StylingHelpers";

function Herb(){
  const { id } = useParams();
  const history = useHistory();
  const [herb, setHerb] = useState(null)
    
  const goBack = () => {
    history.goBack()
  }

  useEffect(() => {
    fetch(`/api/herbs/${id}`)
      .then((resp) => resp.json())
      .then((data) => {
        setHerb(data);
      })
    }, [id]);
    
    if (!herb) {
      return <div>Loading...</div>;
    }
    
  const dosagesList = herb.dosages.length > 0 ? (
    herb.dosages.map((dosage) => {
      return (
        <List key={dosage.id} style={{ color:'white'}}>
          <List.List>
            <List.Header style={{fontWeight: 'bold'}}><Icon name='right triangle' />{dosage.dosage_form}
            </List.Header>
            <List.Description >{dosage.dosage_description}</List.Description>
          </List.List>
        </List>
      )})
      ) : (<p style={{ color:'white'}}>No dosages listed for this herb.</p>);
    
  const herbProperties = herb.properties.map((property) => {
    return (
      <List key={property.id} style={{ color:'white'}}>
        <List.List>
          <List.Header style={{fontWeight: 'bold'}}><Icon name='right triangle' />{property.name}
        </List.Header>
        <List.Description >{property.description}</List.Description>
        </List.List>
      </List>
    )});
    
  const recipesList = herb.recipes.length > 0 ? (
    herb.recipes.map((recipe) => {
      return (
        <List key={recipe.id} style={{ color:'white'}}>
          <List.List>
            <Link to={`/recipes/${recipe.id}`} style={{fontWeight: 'bold'}}><Icon name='right triangle' />{recipe.name}
            </Link>
          </List.List>
        </List>
          )}) 
      ) : (<p style={{ color:'white'}}>No recipes with this herb have been created.</p>);
    
  return (
    <div>
      <Button icon style={{backgroundColor: 'black', color:'white'}} labelPosition='left' onClick={goBack}>
        <Icon color='white' name='backward' />
                Go Back
      </Button>
      <Card raised fluid style= {{backgroundColor: 'rgba(52, 52, 52, 0.8)', padding: '10px'}} className='flex-outer'>
        <Card.Content>
          <Grid columns={2}>
            <Grid.Column>
              <Image src={herb.image_url} size="big"/>
            </Grid.Column>

            <Grid.Column>
              <Header as='h1' style={{color: 'white'}}>{herb.name}</Header>
              <span style={{color: 'white'}}><i>{herb.latin_name}</i></span>

              <p style={{color: 'white', fontSize: '12pt'}}>{herb.description}</p>
              <Card.Description style={{color: 'white', fontSize: '12pt'}}><Icon name='warning sign' color='white' />{herb.warnings}</Card.Description>
            </Grid.Column>
          </Grid>
        </Card.Content>

        <Grid columns = {2}>
          <Grid.Column>
            <Card.Content extra>
                <StyledCardDescription>Herb Dosages:</StyledCardDescription>
                {dosagesList}
            </Card.Content>
          </Grid.Column>

          <Grid.Column>
            <Card.Content extra>
              <StyledCardDescription>Properties:</StyledCardDescription>
              {herbProperties}
            </Card.Content>
          </Grid.Column>
        </Grid>

        <Divider />
        <Card.Content extra>
          <StyledCardDescription>Recipes with {herb.name}:</StyledCardDescription>
          {recipesList}
        </Card.Content>
      </Card>
    </div>
  );
}

export default Herb