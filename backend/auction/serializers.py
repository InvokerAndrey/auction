from rest_framework import serializers

from .models import Auction
from lot.serializers import LotSerializer


class AuctionSerializer(serializers.ModelSerializer):
    lot = serializers.SerializerMethodField(read_only=True)

    def get_lot(self, obj):
        serializer = LotSerializer(obj.lot, many=False)
        return serializer.data

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