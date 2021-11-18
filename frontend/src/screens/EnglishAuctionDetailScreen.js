import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, Image, Button, ListGroup, InputGroup, Form } from 'react-bootstrap';

import AuctionService from '../services/AuctionService'
import Loader from '../components/Loader'
import Message from '../components/Message'
import Timer from '../components/Timer'
import Offers from "../components/Offers";
import { StatusEnum, TypeEnum } from '../constants/auctionConstants'


function EnglishAuctionDetailScreen({match, history}) {

    const [status, setStatus] = useState(0)
    const [newPrice, setNewPrice] = useState(0)
    const [openingDate, setOpeningDate] = useState('')
    const [closingDate, setClosingDate] = useState('')
    const [newOffers, setNewOffers] = useState(0)

    const socket = new WebSocket(`ws://localhost:8000/ws/auction/`);
    socket.onopen = (data) => {
        console.log('open socket')
    }

    socket.onmessage = (event) => {
        let data = JSON.parse(event.data);
        console.log('From server:', data)
        if (data.content.id == match.params.id) {
            setStatus(data.content.auction_status)
            setNewPrice(data.content.end_price)
            setOpeningDate(data.content.opening_date)
            setClosingDate(data.content.closing_date)
            setNewOffers(data.content.offers)
        }
    }

    const auctionService = new AuctionService()

    const dispatch = useDispatch()

    const auctionDetail = useSelector(state => state.auctionDetail)
    const {loading, auction, error} = auctionDetail

    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin

    const offerMake = useSelector(state => state.offerMake)
    const { laoding: loadingOffer, success: successOffer, error: errorOffer  } = offerMake

    useEffect(() => {
        dispatch(auctionService.getAuctionDetail(match.params.id))
    }, [dispatch, match])

    const makeOfferHandler = (e) => {
        e.preventDefault()
        dispatch(auctionService.makeOffer(match.params.id, {price}))
    }
     // Offer price
    const [price, setPrice] = useState(0)

    return (
        <div>
            <Button className="btn btn-dark my-3" onClick={() => history.goBack()}>
                Back
            </Button>
            {loading ? <Loader />
                : error ? <Message variant='danger'>{error}</Message>
                    : (
                        <div>
                            <Row>
                                <Col md={4}>
                                    <Image src={auction.lot.item.photo} alt={auction.lot.item.title} fluid />
                                    <ListGroup variant="flush">
                                        <ListGroup.Item>
                                            <h3>{auction.lot.item.title}</h3>
                                        </ListGroup.Item>
                                        <ListGroup.Item>
                                            <h4>{auction.lot.item.description}</h4>
                                        </ListGroup.Item>
                                    </ListGroup>
                                </Col>
                                <Col md={5}>
                                    <ListGroup variant="flush">
                                        <ListGroup.Item>
                                            <h3>Type: {TypeEnum.getVerboseById(auction.type)}</h3>
                                        </ListGroup.Item>
                                        <ListGroup.Item>
                                            <h3>Status: {status ? StatusEnum.getVerboseById(status) : StatusEnum.getVerboseById(auction.auction_status)}</h3>
                                        </ListGroup.Item>
                                        <ListGroup.Item>
                                            <h3>Start price: ${auction.start_price}</h3>
                                        </ListGroup.Item>
                                        <ListGroup.Item>
                                            <h3>Current offer: ${newPrice ? newPrice : auction.end_price}</h3>
                                        </ListGroup.Item>
                                        <ListGroup.Item>
                                            <h3>Min price step: ${auction.price_step}</h3>
                                        </ListGroup.Item>
                                        <ListGroup.Item>
                                            <h3>Opening date: {openingDate ? openingDate : auction.opening_date}</h3>
                                        </ListGroup.Item>
                                        <ListGroup.Item>
                                            <h3>Closing date: {closingDate ? closingDate : auction.closing_date}</h3>
                                        </ListGroup.Item>
                                        <ListGroup.Item>
                                            { status ?
                                                (
                                                    status == StatusEnum.IN_PROGRESS ?
                                                        <Timer time={ closingDate ? closingDate : auction.closing_date}/>
                                                        : ''
                                                )
                                                :
                                                (
                                                    auction.auction_status == StatusEnum.IN_PROGRESS ?
                                                        <Timer time={ closingDate ? closingDate : auction.closing_date}/>
                                                        : ''
                                                )
                                            }
                                        </ListGroup.Item>
                                        <ListGroup.Item>
                                            <h3>Your offer:</h3>
                                            {loadingOffer && <Loader />}
                                            {errorOffer && <Message variant='danger'>{errorOffer.non_field_errors}</Message>}
                                            {successOffer && <Message variant='success'>Offer has been made</Message> }
                                            <Form.Group className='input-group'>
                                                <InputGroup.Text>$</InputGroup.Text>
                                                <Form.Control
                                                    type='number'
                                                    disabled={
                                                        status ? status != StatusEnum.IN_PROGRESS
                                                            : auction.auction_status != StatusEnum.IN_PROGRESS
                                                        || !userInfo
                                                    }
                                                    value={price}
                                                    // defaultValue={newPrice ? (Number(newPrice) + Number(auction.price_step)).toFixed(2)
                                                    //                         : (Number(auction.end_price) + Number(auction.price_step)).toFixed(2)}
                                                    onChange={(e) => setPrice(e.target.value)}
                                                >
                                                </Form.Control>
                                                <Button
                                                    onClick={makeOfferHandler}
                                                    className='btn-block inline'
                                                    variant='success'
                                                    disabled={
                                                        status ? status != StatusEnum.IN_PROGRESS
                                                            : auction.auction_status != StatusEnum.IN_PROGRESS
                                                        || !userInfo
                                                    }
                                                >
                                                    Offer
                                                </Button>
                                            </Form.Group>
                                        </ListGroup.Item>
                                    </ListGroup>
                                </Col>
                                <Col md={3}>
                                    { newOffers ? <Offers id={match.params.id} newOffers={newOffers}/>
                                        : <Offers id={match.params.id}/>}
                                </Col>
                            </Row>
                        </div>
                    )}
        </div>
    )
}

export default EnglishAuctionDetailScreen
