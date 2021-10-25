from rest_framework import serializers

from .models import Offer
from lot.models import Lot
from auction.enums import AuctionStatusEnum


class OfferSerializer(serializers.ModelSerializer):
    class Meta:
        model = Offer
        fields = ['id', 'lot', 'user', 'price', 'timestamp']

    def validate(self, data):
        lot = Lot.objects.get(pk=data['lot'].pk)
        price_step = lot.auction.start_price.amount * lot.auction.price_step / 100

        if not (lot.auction.opening_date < data['timestamp'] < lot.auction.closing_date):
            raise serializers.ValidationError('You are too late (or early)')
        elif lot.auction.end_price.amount > data['price'] or ((data['price'] - price_step) < lot.auction.end_price.amount):
            raise serializers.ValidationError('Invalid price')
        elif lot.auction.auction_status != AuctionStatusEnum.IN_PROGRESS.value:
            raise serializers.ValidationError(f'Auction is {lot.auction.auction_status}')
        else:
            return data

    def create(self, validated_data):
        validated_data['lot'].auction.end_price = validated_data['price']
        validated_data['lot'].auction.save()
        return Offer.objects.create(**validated_data)
