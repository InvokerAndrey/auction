from rest_framework import serializers
from django.conf import settings

from .models import Auction
from .tasks import close_auction
from lot.serializers import LotSerializer


class AuctionSerializer(serializers.ModelSerializer):
    opening_date = serializers.DateTimeField(format=settings.DATETIME_FORMAT)
    closing_date = serializers.DateTimeField(format=settings.DATETIME_FORMAT)
    lot = LotSerializer(many=False)

    class Meta:
        model = Auction
        fields = [
            'id',
            'type',
            'start_price',
            'end_price',
            'price_step',
            'auction_status',
            'opening_date',
            'closing_date',
            'reserve_price',
            'frequency',
            'lot',
        ]


