import React, {useState} from "react";
import { Modal, Header, Button, Icon } from'semantic-ui-react'
import { UserContext } from '../context/UserContext';
import NewForm from "./MainForm";
import SecondaryForm from "./SecondaryForm";


function ModalPopout({msg,newHerb, msg2}){
    const [open, setOpen] = useState(false)
    const [secondOpen, setSecondOpen] = useState(false)

    const closeBoth = () => {
        setOpen(false)
        setSecondOpen(false)
    }
    return (
        <>
        <Button onClick={() => setOpen(true)}>{msg}</Button>
        <Modal
            closeIcon
            open={open}
            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}
        >
            <Header icon='add' content={msg} />
            <Modal.Content>
                <NewForm newHerb={newHerb}/>
            </Modal.Content>
            <Modal.Actions>
                <Button onClick={() => setSecondOpen(true)} primary>
                    {msg2} <Icon name='right chevron' />
                </Button>
            </Modal.Actions>

            <Modal 
                onClose={() => setSecondOpen(false)}
                open={secondOpen}
            >
                <Modal.Header>{msg2}</Modal.Header>
                <Modal.Content>
                    <SecondaryForm newHerb={newHerb}/>
                </Modal.Content>
                <Modal.Actions>
                    <Button
                        icon='check'
                        content='All Done'
                        onClick={() => closeBoth()}
                    />
                </Modal.Actions>
            </Modal>
        </Modal>
      </>
    )
}

export default ModalPopout