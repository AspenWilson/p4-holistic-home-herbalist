import styled from "styled-components"
import Select from 'react-select'
import { Card, Header, TextArea, Input } from 'semantic-ui-react'


export const StyledSelect = styled(Select)`
    isMulti: {true};
    isClearable;
    closeMenuOnSelect={false}
  .Select__control {
    cursor: pointer;
  }
  .Select__menu {
    color: black;
  }

  .Select__option:hover {
    background-color: #056d52;
    color: white;
  }

  .Select__option--is-focused {
    background-color: white ;
  }
`;

export const FormHeader = styled(Header)`
    text-align: center;
    color: black;
`

export const CardHeader = styled(Card.Header)`
  padding: 10px;
  color: black;
`

export const StyledTextBox = styled(TextArea)`
    height: fit-content;
    resize: vertical;
    width: 100%;
    max-width: 1200px;
    padding: 20px;
    box-sizing:border-box;
    border-color: lightgray;
    border-radius:5px;
    font-family:'Lato','Helvetica Neue',Arial,Helvetica,sans-serif
`

export const StyledInput = styled(Input)`
  fluid;
  size: small
`

export const StyledCardDescription = styled(Card.Description)`
  color: white;
  font-size: 14pt;
  font-weight: bold
`

export const Form = styled.form`
display:flex;
flex-direction:column;
text-align: center;
margin-top:10px;
margin-bottom:10px;
padding: 10px;
font-size:20px;
`