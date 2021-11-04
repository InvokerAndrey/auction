import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, Image, Button, ListGroup, Form } from 'react-bootstrap';

import AuctionService from '../services/AuctionService'
import Loader from '../components/Loader'
import Message from '../components/Message'
import Timer from '../components/Timer'
import { STATUS, TYPE, getKeyByValue } from '../constants/auctionConstants'


function AuctionDetailScreen({match, history}) {

    const [status, setStatus] = useState(0)
    const [newPrice, setNewPrice] = useState(0)
    const [openingDate, setOpeningDate] = useState('')
    const [closingDate, setClosingDate] = useState('')

    const socket = new WebSocket(`ws://localhost:8000/ws/auction/`);
    socket.onopen = (data) => {
        console.log('open socket')
    }

    socket.onmessage = (event) => {
        let data = JSON.parse(event.data);
        console.log('From server:', data);
        console.log('data.content.id:', data.content.id)
        console.log('match.params.id:', match.params.id)
        if (data.content.id == match.params.id) {
            setStatus(data.content.auction_status)
            setNewPrice(data.content.end_price)
            setOpeningDate(data.content.opening_date)
            setClosingDate(data.content.closing_date)
        }
    }

    console.log('status:', status)
    console.log('newPrice:', newPrice)
    console.log('closingDate:', closingDate)

    const auctionService = new AuctionService()

    // Offer price
    const [price, setPrice] = useState(0)

    const dispatch = useDispatch()

    const auctionDetail = useSelector(state => state.auctionDetail)
    const {loading, auction, error} = auctionDetail

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const offerMake = useSelector(state => state.offerMake)
    const { laoding: loadingOffer, success: successOffer, error: errorOffer  } = offerMake

    useEffect(() => {
        dispatch(auctionService.getAuctionDetail(match.params.id))
    }, [dispatch, match])

    const makeOfferHandler = (e) => {
        e.preventDefault()
        console.log('Making offer')
        dispatch(auctionService.makeOffer(match.params.id, {price}))
    }
    
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
                                <Col md={6}>
                                    <Image src={auction.lot.item.photo} alt={auction.lot.item.title} fluid />
                                </Col>
                                <Col md={6}>
                                    <ListGroup variant="flush">
                                        <ListGroup.Item>
                                            <h3>Type: {getKeyByValue(TYPE, auction.type)}</h3>
                                        </ListGroup.Item>
                                        <ListGroup.Item>
                                            <h3>Status: {status ? getKeyByValue(STATUS, status) : getKeyByValue(STATUS, auction.auction_status)}</h3>
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
                                            <Timer time={ closingDate ? closingDate : auction.closing_date}/>
                                        </ListGroup.Item>
                                    </ListGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col md={6}></Col>
                                <Col>
                                    <h2>Your offer:</h2>
                                    <Form.Control
                                        type='number'
                                        value={price}
                                        onChange={(e) => setPrice(e.target.value)}
                                    >
                                    </Form.Control>
                                    <Button
                                        onClick={makeOfferHandler}
                                        className='btn-block'
                                        disabled={
                                            status ? status !== STATUS.IN_PROGRESS
                                                : auction.auction_status !== STATUS.IN_PROGRESS
                                        }
                                    >
                                        Submit
                                    </Button>
                                    {loadingOffer && <Loader />}
                                    {errorOffer && <Message variant='danger'>{errorOffer.non_field_errors}</Message>}
                                    {successOffer && <Message variant='success'>Offer has been made</Message> }
                                </Col>
                            </Row>
                        </div>
                    )}
        </div>
    )
}

export default AuctionDetailScreen
