from django.utils import timezone
from django.db import transaction
from rest_framework import serializers
from djmoney.contrib.django_rest_framework import MoneyField

import datetime

from .models import Offer
from auction.enums import AuctionStatusEnum
from auction.models import Auction
from auction.tasks import close_auction


class OfferSerializer(serializers.ModelSerializer):
    class Meta:
        model = Offer
        fields = ['id', 'auction', 'user', 'price', 'timestamp']


class CreateOfferSerializer(serializers.Serializer):
    price = MoneyField(max_digits=14, decimal_places=2)

    def validate(self, data):
        timestamp = timezone.now()
        auction = Auction.objects.get(pk=self.context.get('auction_pk'))

        if not (auction.opening_date < timestamp < auction.closing_date):
            raise serializers.ValidationError('You are too late (or early)')
        elif auction.end_price.amount > data['price'] or ((data['price'] - auction.price_step.amount) < auction.end_price.amount):
            raise serializers.ValidationError('Invalid price')
        elif auction.auction_status != AuctionStatusEnum.IN_PROGRESS.value:
            raise serializers.ValidationError(f"Auction is {auction.auction_status}")
        
        data['timestamp'] = timestamp
        time_gap = auction.closing_date - timezone.now()
        if time_gap < datetime.timedelta(minutes=5):
            auction.closing_date += datetime.timedelta(minutes=5) - time_gap
            self.context['extend_time'] = True
        data['auction'] = auction
        return data

    @transaction.atomic
    def create(self, validated_data):
        validated_data['auction'].end_price = validated_data['price']
        validated_data['auction'].save()
        validated_data['user'] = self.context['user']
        offer = Offer.objects.create(**validated_data)
        if self.context.get('extend_time'):
            transaction.on_commit(lambda: close_auction.apply_async((validated_data['auction'].pk, ),
                                                                   eta=validated_data['auction'].closing_date))

        json_response = {
            'id': validated_data['auction'].id,
            'auction_status': validated_data['auction'].auction_status,
            'end_price': str(validated_data['auction'].end_price.amount),
            'opening_date': str(validated_data['auction'].opening_date),
            'closing_date': str(validated_data['auction'].closing_date),
        }
        transaction.on_commit(lambda: Auction().send_updates(content=json_response))
        return offer
