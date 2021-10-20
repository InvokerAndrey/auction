import React from 'react'
import { Pagination, Button } from 'react-bootstrap'
import { listItems } from '../actions/itemActions'
import { listLots } from '../actions/lotActions'
import { listAuctions } from '../actions/auctionActions'
import { useDispatch } from 'react-redux'


function Paginate({ type, page, count }) {

    const dispatch = useDispatch()

    let params = {
        params: {
            page: page
        }
    }

    const paginateHandler = (page_number) => {
        params.params.page = page_number

        switch (type) {
            case 'item':
                dispatch(listItems(params))
            case 'lot':
                dispatch(listLots(params))
            case 'auction':
                dispatch(listAuctions(params))
            default: {}
        }
    }

    return (
        count > 1 && (
            <Pagination>
                {[...Array(count).keys()].map((x) => (
                        <Pagination.Item activeLabel=''
                            key={x + 1}
                            active={x + 1 === page}
                            onClick={() => paginateHandler(x + 1)}
                        >
                            {x + 1}
                        </Pagination.Item>
                ))}
            </Pagination>
        )
    )
}

export default Paginate