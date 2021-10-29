import React, { useEffect } from 'react'
import { Row, Col, Button, Pagination } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'

import ItemService from '../services/ItemService'
import Loader from '../components/Loader'
import Message from '../components/Message'
import Item from '../components/Item'
import Paginate from '../components/Paginate'


function ItemListScreen() {
    const itemService = new ItemService()

    const dispatch = useDispatch()

    const itemList = useSelector(state => state.itemList)
    const {loading, error, items, page, count } = itemList

    useEffect(() => {
        dispatch(itemService.listItems())
    }, [dispatch])

    return (
        <div>
            <Row>
                <Col>
                    <h2>Items</h2>
                    {loading ? <Loader />
                        : error ? <Message variant='danger'>{error}</Message>
                            : items.length === 0 ? <Message variant='info'>No Items</Message>
                                : <div>
                                    <Row>
                                        {items.map(item => (
                                            <Col key={item.id} sm={12} md={6} lg={4} xl={3}>
                                                <Item item={item} />
                                            </Col>
                                        ))}
                                    </Row>
                                  </div>
                    }
                </Col>
            </Row>
            <Paginate type={'item'} page={page} count={count} />
        </div>
    )
}

export default ItemListScreen
