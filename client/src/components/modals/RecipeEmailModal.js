import React, { useState, useContext } from "react";
import { Modal, Header, Button, Icon } from'semantic-ui-react';
import { AppContext } from '../../context/AppContext';
import RecipeEmail from "../emailjs/RecipeEmail";


export const RecipeEmailModal = ({recipe}) => {
    const [open, setOpen] = useState(false)
    const { handleModalSuccess, secondOpen } = useContext(AppContext)

    const closeBoth = () => {
        handleModalSuccess()
        setOpen(false)
    }
    return (
        <>
        <Modal
            closeIcon
            open={ open }
            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}
            trigger={<Button icon style={{ backgroundColor: '#056d52', color:'white', fontSize:'14pt' }}>Click here to receive an email with these details! <Icon name='mail' style={{ color:'white' }}/></Button>}
            size="large"
        >
            <Header icon='mail' content='Preview email' as='h2'/>
            <Modal.Content style={{ backgroundColor: '#056d52' }}>
                <RecipeEmail recipe={recipe} />
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

export default RecipeEmailModal;