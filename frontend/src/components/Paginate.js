import React from 'react'
import { Pagination, Button } from 'react-bootstrap'
import ItemService from '../services/ItemService'
import LotService from '../services/LotService'
import AuctionService from '../services/AuctionService'
import { useDispatch } from 'react-redux'


function Paginate({ type, page, count }) {
    const itemService = new ItemService()
    const lotService = new LotService()
    const auctionService = new AuctionService()

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
                dispatch(itemService.listItems(params))
            case 'lot':
                dispatch(lotService.listLots(params))
            case 'auction':
                dispatch(auctionService.listAuctions(params))
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