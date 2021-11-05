from rest_framework import serializers
from django.conf import settings

from .models import Auction
from lot.serializers import LotSerializer


class AuctionSerializer(serializers.ModelSerializer):
    opening_date = serializers.DateTimeField()
    closing_date = serializers.DateTimeField()
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


class UpdateAuctionSerializer(serializers.ModelSerializer):
    opening_date = serializers.DateTimeField()
    closing_date = serializers.DateTimeField()

    class Meta:
        model = Auction
        fields = ['id', 'auction_status', 'end_price', 'opening_date', 'closing_date']

