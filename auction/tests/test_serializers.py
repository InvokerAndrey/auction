from decimal import Decimal

import pytest
from auction.serializers import UpdateAuctionSerializer
from auction.models import Auction
from datetime import datetime
    # Dutch


opening = datetime.fromtimestamp(1636463563.008701)
closing = datetime.fromtimestamp(1636463623.008701)


@pytest.fixture()
def auction(db) -> Auction:
    return Auction.objects.create(
        type=1,
        start_price=Decimal('1'),
        auction_status=2,
        opening_date=opening,
        closing_date=closing,
    )


def test_update_auction_serializer(auction):
    serializer = UpdateAuctionSerializer(auction, many=False)
    assert serializer.data == {
        'id': 1,
        'auction_status': 2,
        'end_price': '1.00',
        'opening_date': opening.strftime('%Y-%m-%d %H:%M:%S'),
        'closing_date': closing.strftime('%Y-%m-%d %H:%M:%S'),
        'offers': []
    }
