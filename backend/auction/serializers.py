from rest_framework import serializers
from django.db import transaction
from djmoney.contrib.django_rest_framework import MoneyField

from .models import Auction
from .tasks import close_dutch_auction
from lot.serializers import LotSerializer
from offer.serializers import OfferSerializer


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
            'is_bought',
            'reserve_price',
            'frequency',
            'lot',
        ]


class UpdateAuctionSerializer(serializers.ModelSerializer):
    opening_date = serializers.DateTimeField()
    closing_date = serializers.DateTimeField()
    offers = serializers.SerializerMethodField()

    def get_offers(self, obj):
        return OfferSerializer(obj.offer_set.order_by('-pk')[:5], many=True).data

    class Meta:
        model = Auction
        fields = ['id', 'auction_status', 'end_price', 'opening_date', 'closing_date', 'offers']


class BuyItNowSerializer(serializers.Serializer):
    id = serializers.IntegerField()

    def validate(self, data):
        print('data:', data)
        auction = Auction.objects.get(pk=data['id'])
        if auction.is_bought:
            raise serializers.ValidationError('Lot already sold')
        elif auction.end_price <= auction.reserve_price:
            raise serializers.ValidationError('Lot has reached reserve price')
        return data

    @transaction.atomic
    def update(self, instance, validated_data):
        print('UPDATE')
        instance.is_bought = True
        instance.save()
        transaction.on_commit(lambda: close_dutch_auction.delay(pk=validated_data['id']))
        return instance
