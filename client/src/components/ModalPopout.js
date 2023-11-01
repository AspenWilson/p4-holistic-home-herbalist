import React, {useState, useContext} from "react";
import { Modal, Header, Button, Icon } from'semantic-ui-react'
import { UserContext } from '../context/AppContext';
import HerbForm from "./HerbForm";
import RecipeForm from "./RecipeForm";
import HerbEdits from "./HerbEdits";
import RecipeEdits from "./RecipeEdits";
import CommentEdits from "./CommentEdits";

function ModalPopout({msg, modalType, id}){
    const [open, setOpen] = useState(false)
    const { handleModalSuccess, secondOpen } = useContext(UserContext)

    const closeBoth = () => {
        handleModalSuccess()
        setOpen(false)
    }

    const triggerOptions = modalType === 'new herb'
        ? <Button icon style={{backgroundColor: '#056d52', color:'white'}}>Add Herb <Icon name='add' color='white'/></Button>
        : modalType === 'new recipe'
        ? <Button icon style={{backgroundColor: '#056d52', color:'white'}}>Add Recipe <Icon name='add' color='white'/></Button>
        : <Button circular icon='edit' style={{color:'#056d52'}}/>



    const displayedForm = 
        modalType === 'new herb' ? <HerbForm />
        : modalType === 'new recipe' ? <RecipeForm />
        : modalType === 'herb edits' ? <HerbEdits id={ id }/>
        : modalType === 'recipe edits' ? <RecipeEdits id={ id }/>
        : modalType === 'comment edits' ? <CommentEdits id={ id } />
        : null

    return (
        <>
        <Modal
            closeIcon
            open={open}
            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}
            trigger={triggerOptions}
        >
            <Header icon='add' content={msg} />
            <Modal.Content style={{backgroundColor: '#056d52'}}>
                {displayedForm}
            </Modal.Content>
            <Modal 
                onClose = {() => handleModalSuccess()}
                open = {secondOpen}
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

export default ModalPopout