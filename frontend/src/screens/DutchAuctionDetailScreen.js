import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, Image, Button, ListGroup } from 'react-bootstrap';

import AuctionService from '../services/AuctionService'
import Loader from '../components/Loader'
import Message from '../components/Message'
import Timer from '../components/Timer'
import { StatusEnum, TypeEnum } from '../constants/auctionConstants'


function DutchAuctionDetailScreen({match, history}) {

    const [status, setStatus] = useState(0)
    const [newPrice, setNewPrice] = useState(0)
    const [openingDate, setOpeningDate] = useState('')

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
        }
    }

    const auctionService = new AuctionService()

    const dispatch = useDispatch()

    const auctionDetail = useSelector(state => state.auctionDetail)
    const {loading, auction, error} = auctionDetail

    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin

    let time = new Date(auction.opening_date)
    time.setMinutes(time.getMinutes() + Number(auction.frequency))

    const [timerTime, setTimerTime] = useState(time)

    const resetTimer = () => {
        let nextTime = Date()
        nextTime.setMinutes(nextTime.getMinutes() + Number(auction.frequency))
        setTimerTime(nextTime)
    }

    let timerInterval = setInterval(() => resetTimer())

    if (auction.auction_status != StatusEnum.IN_PROGRESS || status != StatusEnum.IN_PROGRESS || auction.is_bought) {
        clearInterval(timerInterval)
    }

    useEffect(() => {
        dispatch(auctionService.getAuctionDetail(match.params.id))
    }, [dispatch, match])

    const buyItNow = useSelector(state => state.buyItNow)
    const {loading: loadingBuyItNow, error: errorBuyItNow, success: successBuyItNow} = buyItNow

    const buyItNowHandler = (e) => {
        e.preventDefault()
        dispatch(auctionService.buyItNow(match.params.id))
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
                                <Col md={8}>
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
                                            <h3>Price step: ${auction.price_step}</h3>
                                        </ListGroup.Item>
                                        <ListGroup.Item>
                                            <h3>Reserve price: ${auction.reserve_price}</h3>
                                        </ListGroup.Item>
                                        <ListGroup.Item>
                                            <h3>Opening date: {openingDate ? openingDate : auction.opening_date}</h3>
                                        </ListGroup.Item>
                                        <ListGroup.Item>
                                            <h3>Frequency: {auction.frequency} minutes</h3>
                                        </ListGroup.Item>
                                        <ListGroup.Item>
                                            <h3>Until the next reduction:</h3>
                                            { status ?
                                                (
                                                    status == StatusEnum.IN_PROGRESS ?
                                                        <Timer time={timerTime}/>
                                                        : ''
                                                )
                                                :
                                                (
                                                    auction.auction_status == StatusEnum.IN_PROGRESS ?
                                                        <Timer time={timerTime}/>
                                                        : ''
                                                )
                                            }
                                        </ListGroup.Item>
                                        <ListGroup.Item>
                                            <Row>
                                                <Col>
                                                    <Button
                                                        onClick={buyItNowHandler}
                                                        className='btn-block'
                                                        variant='success'
                                                        disabled={
                                                            status ? status != StatusEnum.IN_PROGRESS
                                                                : auction.auction_status != StatusEnum.IN_PROGRESS
                                                            || !userInfo || auction.is_bought
                                                        }
                                                    >
                                                        Buy It Now
                                                    </Button>
                                                </Col>
                                                <Col>
                                                    {loadingBuyItNow && <Loader />}
                                                    {errorBuyItNow && <Message variant='danger'>{errorBuyItNow.non_field_errors}</Message>}
                                                    {successBuyItNow && <Message variant='success'>Purchase completed successfully</Message> }
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>
                                    </ListGroup>
                                </Col>
                            </Row>
                        </div>
                    )}
        </div>
    )
}

export default DutchAuctionDetailScreen
