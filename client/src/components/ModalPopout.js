import React, {useState, useContext} from "react";
import { Modal, Header, Button, Icon } from'semantic-ui-react'
import { UserContext } from '../context/UserContext';
import HerbForm from "./HerbForm";
import RecipeForm from "./RecipeForm";
import SuccessMsg from "./SuccessMsg";
import HerbEdits from "./HerbEdits";
import RecipeEdits from "./RecipeEdits";

function ModalPopout({msg, modalType, id}){
    const [open, setOpen] = useState(false)
    const { handleModalSuccess, secondOpen } = useContext(UserContext)

    const closeBoth = () => {
        handleModalSuccess()
        setOpen(false)
    }

    const onOpen = () => {
        setOpen(true)
        console.log('modal type from Modal:', modalType)
    }

    const displayedForm = modalType === 'new herb' ? <HerbForm />
    : modalType === 'new recipe' ? <RecipeForm />
    : modalType === 'herb edits' ? <HerbEdits id={id}/>
    : modalType === 'recipe edits' ? <RecipeEdits />
    : null

    return (
        <>
        <Button onClick={() => onOpen()}>{msg}</Button>
        <Modal
            closeIcon
            open={open}
            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}
        >
            <Header icon='add' content={msg} />
            <Modal.Content>
                {displayedForm}
            </Modal.Content>
            <Modal 
                onClose = {() => handleModalSuccess()}
                open = {secondOpen}
            >
                <Modal.Header>Success!</Modal.Header>
                <Modal.Content> 
                    <SuccessMsg />
                </Modal.Content>
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