from rest_framework import serializers

from .models import Lot
from item.serializers import ItemSerializer


class LotSerializer(serializers.ModelSerializer):
    item = ItemSerializer(many=False)
    
    class Meta:
        model = Lot
        fields = ['id', 'item']
