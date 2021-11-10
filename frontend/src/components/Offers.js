import React, { useEffect } from 'react'
import {Col, ListGroup, Row} from 'react-bootstrap'
import { useDispatch, useSelector } from "react-redux";
import AuctionService from "../services/AuctionService";
import Loader from "./Loader";
import Message from "./Message";


function Offers({ id, newOffers }) {
    const dispatch = useDispatch()

    const recentOfferList = useSelector(state => state.recentOfferList)
    let {loading, offers, error} = recentOfferList

    if (newOffers) {
        offers = newOffers
    }

    const auctionService = new AuctionService()

    useEffect(() => {
        dispatch(auctionService.listRecentOffers(id))
    }, [dispatch])

    return (
        <div>
            <h2>Recent offers: </h2>
                {loading ? <Loader />
                    : error ? <Message variant='danger'>{error}</Message>
                        : offers.length === 0 ? <Message variant='info'>No offers yet</Message>
                            : <ListGroup>
                                {offers.map(offer => (
                                    <ListGroup.Item key={offer.id}>
                                        {offer.username} : ${offer.price} at {offer.timestamp}
                                    </ListGroup.Item>
                                ))}
                              </ListGroup>
                }
        </div>


    )
}

export default Offers