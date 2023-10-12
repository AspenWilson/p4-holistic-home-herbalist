import React from 'react'
import { Message } from 'semantic-ui-react'

function SuccessMsg ({msg}) {
    return (
    <Message
      success
      header='Success'
      content={msg}
    />
    )
}

export default SuccessMsg