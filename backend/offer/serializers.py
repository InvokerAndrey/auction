from django.conf import settings
from django.utils import timezone
from django.db import transaction
from rest_framework import serializers
from djmoney.contrib.django_rest_framework import MoneyField

from .models import Offer
from auction.enums import AuctionStatusEnum
from auction.models import Auction


class OfferSerializer(serializers.ModelSerializer):
    class Meta:
        model = Offer
        fields = ['id', 'auction', 'user', 'price', 'timestamp']


class CreateOfferSerializer(serializers.Serializer):
    price = MoneyField(max_digits=14, decimal_places=2)

    def validate(self, data):
        timestamp = timezone.now()
        auction = Auction.objects.get(pk=self.context.get('auction_pk'))
        price_step = auction.start_price.amount * auction.price_step / 100

        if not (auction.opening_date < timestamp < auction.closing_date):
            raise serializers.ValidationError('You are too late (or early)')
        elif auction.end_price.amount > data['price'] or ((data['price'] - price_step) < auction.end_price.amount):
            raise serializers.ValidationError('Invalid price')
        elif auction.auction_status != AuctionStatusEnum.IN_PROGRESS.value:
            raise serializers.ValidationError(f"Auction is {auction.auction_status}")
        else:
            data['timestamp'] = timestamp
            data['auction'] = auction
            return data

    @transaction.atomic
    def create(self, validated_data):
        validated_data['auction'].end_price = validated_data['price']
        validated_data['auction'].save()
        validated_data['user'] = self.context['user']
        return Offer.objects.create(**validated_data)
