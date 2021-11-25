from django.contrib.auth.models import User
import pytest

from datetime import datetime

from offer.serializers import CreateOfferSerializer
from auction.models import Auction
from auction.enums import AuctionStatusEnum


@pytest.fixture()
def user(db) -> User:
    return User.objects.create(username='admin', password='admin', is_staff=True)


@pytest.fixture()
def auction(db) -> Auction:
    opening = datetime.fromtimestamp(1636463563.008701)
    closing = datetime.fromtimestamp(1736463623.008701)
    return Auction.objects.create(
        type=1,
        start_price=1,
        end_price=1,
        auction_status=2,
        opening_date=opening,
        closing_date=closing,
    )


@pytest.mark.django_db
def test_create_offer_serializer(user, auction):
    context = {
        'user': user,
        'auction_pk': auction.id,
    }
    data = {
        'price': 2
    }
    serializer = CreateOfferSerializer(data=data, context=context)
    assert serializer.is_valid()

    auction.closing_date = datetime.fromtimestamp(1636463623.008701)
    auction.save()
    serializer = CreateOfferSerializer(data=data, context=context)
    serializer.is_valid()
    assert serializer.is_valid() is False
    assert serializer.errors['non_field_errors'][0] == 'Not in time'

    data['price'] = 1
    auction.closing_date = datetime.fromtimestamp(1736463623.008701)
    auction.save()
    serializer = CreateOfferSerializer(data=data, context=context)
    assert serializer.is_valid() is False
    assert serializer.errors['non_field_errors'][0] == 'Invalid price'

    data['price'] = 2
    auction.auction_status = AuctionStatusEnum.CLOSED.value
    auction.save()
    serializer = CreateOfferSerializer(data=data, context=context)
    assert serializer.is_valid() is False
    assert serializer.errors['non_field_errors'][0] == 'Auction is CLOSED'
