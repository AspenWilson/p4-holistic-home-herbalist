import React, { useState, useContext, useEffect } from "react";
import { Modal, Header, Button, Icon } from'semantic-ui-react'
import { AppContext } from '../context/AppContext';
import HerbForm from "./herb/HerbForm";
import RecipeForm from "./recipe/RecipeForm";
import HerbEdits from "./herb/HerbEdits";
import RecipeEdits from "./recipe/RecipeEdits";
import CommentEdits from "./comment/CommentEdits"

export function ModalPopout({ msg, modalType, id }){
    const [open, setOpen] = useState(false)
    const { handleModalSuccess, secondOpen } = useContext(AppContext)

    const closeBoth = () => {
        handleModalSuccess()
        setOpen(false)
    }

    const triggerOptions = 
        modalType === 'new herb'
            ? <Button icon style={{ backgroundColor: '#056d52', color:'white' }}>Add Herb <Icon name='add' style={{ color:'white' }}/></Button> :
        modalType === 'new recipe'
            ? <Button icon style={{ backgroundColor: '#056d52', color:'white' }}>Add Recipe <Icon name='add' style={{ color:'white' }}/></Button> :
        <Button circular icon='edit' style={{ color:'#056d52' }}/>



    const displayedForm = 
        modalType === 'new herb' ? <HerbForm /> :
        modalType === 'new recipe' ? <RecipeForm /> :
        modalType === 'herb edits' ? <HerbEdits id={ id }/> :
        modalType === 'recipe edits' ? <RecipeEdits id={ id }/> :
        modalType === 'comment edits' ? <CommentEdits id={ id } /> :
        null

    const iconOptions = 
        modalType === 'new herb' ? 'add' :
        modalType === 'new recipe' ? 'add' :
        'edit' 


    return (
        <>
        <Modal
            closeIcon
            open={ open }
            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}
            trigger={ triggerOptions }
            size="large"
        >
            <Header icon={iconOptions} content={ msg } as='h2'/>
            <Modal.Content style={{ backgroundColor: '#056d52' }}>
                { displayedForm }
            </Modal.Content>
            <Modal 
                onClose = {() => handleModalSuccess()}
                open = { secondOpen }
            >
                <Modal.Header>Success!</Modal.Header>
                <Modal.Actions>
                    <Button 
                        icon='check'
                        content='Done'
                        onClick={() => closeBoth()}
                    />
                </Modal.Actions>
            </Modal>
        </Modal>
      </>
    )
}

export const SuccessModal = ({ statusIs, setStatus }) => {
    const [open, setOpen] = useState(false)
    
    useEffect(() => {
        if(statusIs === 'success') {
            setOpen(true)
        }
    }, [statusIs])

    const handleClose =() => {
        setOpen(false)
        setStatus(null)
    }
    return (
        <Modal
          onClose={handleClose}
          open={open}
        >
          <Modal.Header>Success!</Modal.Header>
        </Modal>
        
    )
}