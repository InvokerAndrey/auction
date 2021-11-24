import React, {useState} from 'react'
import { Alert, Button } from 'react-bootstrap'


function Message({ variant, children }) {
    return (
        <Alert variant={variant}>
            {children}
        </Alert>
    )
}

export default Message