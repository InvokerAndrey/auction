from django.db import models
from djmoney.models.fields import MoneyField

from .enums import AuctionTypeEnum, AuctionStatusEnum


class Auction(models.Model):
    # Common (English and Dutch)
    type = models.CharField(
        max_length=255,
        choices=AuctionTypeEnum.choices(),
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
        null=True,
        blank=True
    )
    # % of previous price (usually = 5-15%)
    price_step = models.IntegerField(
        default=5,
        verbose_name='Price step'
    )
    auction_status = models.CharField(
        max_length=255,
        choices=AuctionStatusEnum.choices(),
        verbose_name='Auction status'
    )
    opening_date = models.DateTimeField(
        auto_now_add=True,
        verbose_name='Opening date'
    )
    closing_date = models.DateTimeField(verbose_name='Closing date')

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
        return f'{self.type}: start {self.opening_date.strftime("%Y-%m-%d %H:%M:%S")}'

    @staticmethod
    def change_status(auction, status):
        auction.auction_status = status
        auction.save(update_fields=['auction_status'])
