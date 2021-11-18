import React, { useEffect, useState } from 'react'
import { Row, Col, ListGroup, Button, Form } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'

import AuctionService from '../services/AuctionService'
import Loader from '../components/Loader'
import Message from '../components/Message'
import Auction from '../components/Auction'
import Paginate from '../components/Paginate'
import { TypeEnum, StatusEnum } from "../constants/auctionConstants";


function AuctionListScreen() {
    const auctionService = new AuctionService()

    const dispatch = useDispatch()

    const auctionList = useSelector(state => state.auctionList)
    const {loading, error, auctions, page, count} = auctionList

    const [filterType, setFilterType] = useState('')
    const [filterStatus, setFilterStatus] = useState('')

    const params = {
        params: {
            type: filterType,
            status: filterStatus
        }
    }

    useEffect(() => {
        dispatch(auctionService.listAuctions(params))
    }, [dispatch])

    const filterHandler = () => {
        dispatch(auctionService.listAuctions(params))
    }

    return (
        <div>
            <Row>
                <Col md={3}>
                    <h3>FILTER</h3>
                    <ListGroup>
                        <ListGroup.Item>
                            <Row>
                                <Col>
                                    Type:
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Form.Control
                                        as='select'
                                        value={filterType}
                                        onChange={(e) => setFilterType(e.target.value)}
                                    >
                                        {
                                            (TypeEnum.getIdList().concat('')).map((x) => (
                                                <option key={x} value={x}>
                                                    {TypeEnum.getVerboseById(x)}
                                                </option>
                                            ))
                                        }
                                    </Form.Control>
                                </Col>
                            </Row>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <Row>
                                <Col>
                                    Status:
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Form.Control
                                        as='select'
                                        value={filterStatus}
                                        onChange={(e) => setFilterStatus(e.target.value)}
                                    >
                                        {
                                            (StatusEnum.getIdList().concat('')).map((x) => (
                                                <option key={x} value={x}>
                                                    {StatusEnum.getVerboseById(x)}
                                                </option>
                                            ))
                                        }
                                    </Form.Control>
                                </Col>
                            </Row>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <Row>
                                <Button
                                    onClick={filterHandler}
                                    className="btn-block"
                                    type="button"
                                >
                                    Search
                                </Button>
                            </Row>
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
                <Col>
                    <h2>Auctions</h2>
                    {loading ? <Loader />
                        : error ? <Message variant='danger'>{error}</Message>
                            : auctions.length === 0 ? <Message variant='info'>No Auctions</Message>
                                : <div>
                                    <Row>
                                        {auctions.map(auction => (
                                            <Col key={auction.id} sm={12} md={6} lg={4} xl={3}>
                                                <Auction auction={auction} />
                                            </Col>
                                        ))}
                                    </Row>
                                  </div>
                    }
                    <Paginate type={'auction'} page={page} count={count} />
                </Col>
            </Row>
        </div>
    )
}

export default AuctionListScreen
