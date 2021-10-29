import React, { useEffect } from 'react'
import { Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'

import LotService from '../services/LotService'
import Loader from '../components/Loader'
import Message from '../components/Message'
import Lot from '../components/Lot'
import Paginate from '../components/Paginate'


function LotListScreen() {
    const lotService = new LotService()

    const dispatch = useDispatch()

    const lotList = useSelector(state => state.lotList)
    const {loading, error, lots, page, count} = lotList

    useEffect(() => {
        dispatch(lotService.listLots())
    }, [dispatch])

    return (
        <div>
            <Row>
                <Col>
                    <h2>Lots</h2>
                    {loading ? <Loader />
                        : error ? <Message variant='danger'>{error}</Message>
                            : lots.length === 0 ? <Message variant='info'>No Lots</Message>
                                : <div>
                                    <Row>
                                        {lots.map(lot => (
                                            <Col key={lot.id} sm={12} md={6} lg={4} xl={3}>
                                                <Lot lot={lot} />
                                            </Col>
                                        ))}
                                    </Row>
                                  </div>
                    }
                </Col>
            </Row>
            <Paginate type={'lot'} page={page} count={count} />
        </div>
    )
}

export default LotListScreen
