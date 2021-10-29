import React from 'react'
import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'


function Lot({lot}) {
    return (
        <Card className="my-3 p-3 rounded">
            <Link to={`/`}>
                <Card.Img src={lot.item.photo}/>
            </Link>
            <Card.Body>
                <Link to={`/`}>
                    <Card.Title as="div">
                        <strong>{lot.item.title}</strong>
                    </Card.Title>
                </Link>
            </Card.Body>
        </Card>
    )
}

export default Lot
