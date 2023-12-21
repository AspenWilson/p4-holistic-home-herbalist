import React from 'react';
import { PFont } from "./helpers/StylingHelpers";
import { Container } from 'semantic-ui-react';


function Resources () {
    return (
    <>
        <Container  fluid style= {{ backgroundColor: 'rgba(52, 52, 52, 0.8)', padding: '10px' }}>
        <h1>Resources</h1>
        <PFont>For most of our initial herbal, recipe, and property enteries, we leveraged <strong>The Modern Dispensatory: A Medicine-Making Guide</strong>, written by Thomas Easley and Steven Horne. This is a great introductory resource to get you start and give you some baseline level knowledge on herbalism. </PFont>
        <PFont>While this is a great starting point, there are a lot of other resources available, either in print or online. The key is to make sure you're referencing reliable sources. Of course, always consult your doctor before making any changes to your medicinal routine. </PFont>
        </Container>
        </>
    )
}

export default Resources