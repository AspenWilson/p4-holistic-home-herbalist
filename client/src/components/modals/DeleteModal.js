import React, { useState, useContext } from 'react';
import { Button, Modal, Header } from 'semantic-ui-react';
import { AppContext } from '../../context/AppContext';


function DeleteModal ({ handleDelete }) {
    const [open, setOpen] = useState(false)
    const { handleModalSuccess, secondOpen } = useContext(AppContext)

    const closeBoth = () => {
        handleModalSuccess()
        setOpen(false)
    }
    return (
        <>
        <Modal
            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}
            open={ open }
            trigger={<Button circular  icon="trash" color='red'/>}
        >
        <Header icon='trash' content='Confirm delete' />
        <Modal.Content style={{ backgroundColor: '#056d52' }}>
          <Modal.Description>
            <p>
              Are you sure you want to delete? This action cannot be undone.
            </p>
          </Modal.Description>
        </Modal.Content>
        <Modal.Actions>
          <Button color='black' onClick={() => setOpen(false)}> Cancel </Button>
          <Button
            content="Delete"
            labelPosition='right'
            icon='checkmark'
            onClick={ handleDelete }
          />
        </Modal.Actions>
        <Modal 
            onClose= {() => handleModalSuccess()}
            open= { secondOpen }
        >
            <Modal.Header>Success!</Modal.Header>
            <Modal.Actions>
                <Button
                    icon = 'thumbs up outline'
                    content = 'Done'
                    onClick= {() => closeBoth()}
                    />
            </Modal.Actions>    

        </Modal>
      </Modal>
      </>
    )
}

export default DeleteModal