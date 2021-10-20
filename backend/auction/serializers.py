from rest_framework import serializers

from .models import Auction
from lot.serializers import LotSerializer


class AuctionSerializer(serializers.ModelSerializer):
    lot = serializers.SerializerMethodField(read_only=True)
    opening_date = serializers.SerializerMethodField(read_only=True)
    closing_date = serializers.SerializerMethodField(read_only=True)

    def get_lot(self, obj):
        serializer = LotSerializer(obj.lot, many=False)
        return serializer.data

    def get_opening_date(self, obj):
        return obj.opening_date.strftime("%Y-%m-%d %H:%M:%S")

    def get_closing_date(self, obj):
        return obj.closing_date.strftime("%Y-%m-%d %H:%M:%S")

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