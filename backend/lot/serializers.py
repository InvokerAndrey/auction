from rest_framework import serializers

from .models import Lot
from item.serializers import ItemSerializer


class LotSerializer(serializers.ModelSerializer):
    item = serializers.SerializerMethodField(read_only=True)
    auction = serializers.SerializerMethodField(read_only=True)

    def get_item(self, obj):
        return ItemSerializer(obj.item, many=False).data

    def get_auction(self, obj):
        return {
            'id': obj.auction.pk,
            'type': obj.auction.type,
            'auction_status': obj.auction.auction_status
        }

    class Meta:
        model = Lot
        fields = ['id', 'item', 'auction']