from django.db import models
from django.utils import timezone
from djmoney.models.fields import MoneyField
from django.conf import settings
from channels.layers import get_channel_layer
from asgiref.sync import async_to_sync

from .enums import AuctionTypeEnum, AuctionStatusEnum


class Auction(models.Model):
    # 10%
    STEP = 0.1
    # Common (English and Dutch)
    type = models.IntegerField(
        choices=AuctionTypeEnum.choices(),
        default=AuctionTypeEnum.ENGLISH,
        verbose_name='Auction type'
    )
    start_price = MoneyField(
        max_digits=14,
        decimal_places=2,
        default_currency='USD',
        verbose_name='Start price'
    )
    end_price = MoneyField(
        max_digits=14,
        decimal_places=2,
        default_currency='USD',
        verbose_name='End price',
    )
    price_step = MoneyField(
        max_digits=14,
        decimal_places=2,
        default_currency='USD',
        verbose_name='Price step',
        null=True,
        blank=True
    )
    auction_status = models.IntegerField(
        choices=AuctionStatusEnum.choices(),
        default=AuctionStatusEnum.PENDING,
        verbose_name='Auction status'
    )
    opening_date = models.DateTimeField(
        default=timezone.now,
        verbose_name='Opening date'
    )
    closing_date = models.DateTimeField(verbose_name='Closing date')

    is_bought = models.BooleanField(default=False)

    # Dutch
    # minimum amount you are willing to sell for
    reserve_price = MoneyField(
        max_digits=14,
        decimal_places=2,
        default_currency='USD',
        verbose_name='Reserve price',
        null=True,
        blank=True
    )
    # how often (minutes) should we update the price
    frequency = models.IntegerField(null=True, blank=True)

    def __str__(self):
        return f'Auction {self.pk}: {self.type}: start {self.opening_date}'

    def save(self, *args, **kwargs):
        # 10% of start price
        if not self.price_step:
            self.price_step = self.start_price * self.STEP
        if not self.end_price:
            self.end_price = self.start_price
        super().save(*args, **kwargs)

    def send_updates(self):
        from .serializers import UpdateAuctionSerializer
        serializer = UpdateAuctionSerializer(self, many=False)
        layer = get_channel_layer()
        async_to_sync(layer.group_send)(
            'auctions',
            {
                'type': 'auctions.alarm', # Name of the method of Consumer that will handle the message
                'content': serializer.data
            }
        )
        print('SENT:', serializer.data)

