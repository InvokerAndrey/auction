import pytest

from offer.serializers import CreateOfferSerializer, OfferSerializer
from offer.models import Offer
from django.contrib.auth.models import User
from auction.models import Auction
from datetime import datetime


@pytest.fixture()
def user(db) -> User:
    return User.objects.create(username='admin', password='admin', is_staff=True)

@pytest.fixture()
def auction(db) -> Auction:
    opening = datetime.fromtimestamp(1636463563.008701)#.strftime('%Y-%m-%d %H:%M:%S')
    closing = datetime.fromtimestamp(1736463623.008701)#.strftime('%Y-%m-%d %H:%M:%S')
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
    print('zxc:', serializer.is_valid(), serializer.errors)
    assert serializer.is_valid()
