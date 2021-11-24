import React from 'react'
import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { StatusEnum, TypeEnum } from '../constants/auctionConstants'


function Auction({auction}) {
    return (
        <Card className="my-3 p-3 rounded">
            <Card.Img src={auction.lot.item.photo} alt={auction.lot.item.title}/>
            <Card.Body>
                <Link to={ auction.type === TypeEnum.ENGLISH ? `/english-auction/${auction.id}` : `/dutch-auction/${auction.id}`}>
                    <Card.Title as="div">
                        <strong>{TypeEnum.getVerboseById(auction.type)}</strong> auction
                    </Card.Title>
                </Link>
                <Card.Text as="div">
                    <strong>{StatusEnum.getVerboseById(auction.auction_status)}</strong><br/>
                    Item: {auction.lot.item.title} <br />
                    Start price: ${auction.start_price} <br/>
                    Current price: ${auction.end_price} <br/>
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
