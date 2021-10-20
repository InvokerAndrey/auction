import React, { useEffect } from 'react'
import { Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'

import { listAuctions } from '../actions/auctionActions'
import Loader from '../components/Loader'
import Message from '../components/Message'
import Auction from '../components/Auction'
import Paginate from '../components/Paginate'


function AuctionListScreen() {

    const dispatch = useDispatch()

    const auctionList = useSelector(state => state.auctionList)
    const {loading, error, auctions, page, count} = auctionList

    useEffect(() => {
        dispatch(listAuctions())
    }, [dispatch])

    return (
        <div>
            <Row>
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
                </Col>
            </Row>
            <Paginate type={'auction'} page={page} count={count} />
        </div>
    )
}

export default AuctionListScreen
