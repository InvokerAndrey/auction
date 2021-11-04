import React from 'react'
import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { STATUS, TYPE, getKeyByValue } from '../constants/auctionConstants'


function Auction({auction}) {
    return (
        <Card className="my-3 p-3 rounded">
            {/* <Link to={`/`}>
                <Card.Img src={auction.type}/>
            </Link> */}
            <Card.Body>
                <Link to={`/auction/${auction.id}`}>
                    <Card.Title as="div">
                        <strong>{getKeyByValue(TYPE, auction.type)}</strong> auction
                    </Card.Title>
                </Link>
                <Card.Text as="div">
                    <strong>{getKeyByValue(STATUS, auction.auction_status)}</strong> <br/>
                    Start price: ${auction.start_price} <br/>
                    End price: ${auction.end_price} <br/>
                    Opening date: {auction.opening_date} <br/>
                    Closing date: {auction.closing_date} <br/>
                </Card.Text>                
                {auction.type === 'DUTCH' && (
                    <Card.Text as="div">
                        Reserve price: ${auction.reserve_price} <br/>
                        Frequency: {auction.frequency} min <br/>
                    </Card.Text>
                )}
            </Card.Body>
        </Card>
    )
}

export default Auction
