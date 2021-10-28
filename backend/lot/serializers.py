from rest_framework import serializers

from .models import Lot
from item.serializers import ItemSerializer


class LotSerializer(serializers.ModelSerializer):
    item = ItemSerializer(many=False)

    # def get_auction(self, obj):
    #     return {
    #         'id': obj.auction.pk,
    #         'type': obj.auction.type,
    #         'auction_status': obj.auction.auction_status
    #     }

    class Meta:
        model = Lot
        fields = ['id', 'item']
