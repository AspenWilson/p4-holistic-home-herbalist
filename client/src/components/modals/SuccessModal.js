import React, { useState, useEffect } from "react";
import { Modal } from'semantic-ui-react';


function SuccessModal ({ statusIs, setStatus }) {
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

export default SuccessModal;