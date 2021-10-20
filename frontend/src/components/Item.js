import React from 'react'
import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'


function Item({item}) {
    return (
        <Card className="my-3 p-3 rounded">
            <Link to={`/`}>
                <Card.Img src={item.photo}/>
            </Link>
            <Card.Body>
                <Link to={`/`}>
                    <Card.Title as="div">
                        <strong>{item.title}</strong>
                    </Card.Title>
                </Link>

                <Card.Text as="h3">
                    {item.description}
                </Card.Text>
            </Card.Body>
        </Card>
    )
}

export default Item
