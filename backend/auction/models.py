from django.db import models
from djmoney.models.fields import MoneyField


class Item(models.Model):
    photo = models.ImageField(null=True, blank=True, default='/placeholder.jpg')
    title = models.CharField(max_length=255, null=True, blank=True)
    description = models.TextField(null=True, blank=True)


class Lot(models.Model):
    item = models.ForeignKey(Item, on_delete=models.CASCADE)
    auction = models.ForeignKey('Auction', on_delete=models.CASCADE)


class Auction(models.Model):
    english_auction = models.OneToOneField('EnglishAuction', on_delete=models.CASCADE, null=True, blank=True)
    dutch_auction = models.OneToOneField('DutchAuction', on_delete=models.CASCADE, null=True, blank=True)


class EnglishAuction(models.Model):
    status_choices = [
        (1, 'PENDING'),
        (2, 'IN_PROGRESS'),
        (3, 'CLOSED'),
    ]

    opening_price = MoneyField(max_digits=14, decimal_places=2, default_currency='USD', verbose_name='Opening price')
    opening_date = models.DateField(auto_now_add=True, verbose_name='Opening date')
    closing_date = models.DateField(verbose_name='Opening date')
    auction_status = models.CharField(max_length=255, choices=status_choices, verbose_name='Auction Status')
    buy_it_now_price = MoneyField(max_digits=14, decimal_places=2, default_currency='USD', verbose_name='"Buy It Now" price')
    reserve_price = MoneyField(max_digits=14, decimal_places=2, default_currency='USD', verbose_name='Reserve price') # minimum amount you are willing to sell for


class DutchAuction(models.Model):
    status_choices = [
        (1, 'PENDING'),
        (2, 'IN_PROGRESS'),
        (3, 'CLOSED'),
    ]

    start_price = MoneyField(max_digits=14, decimal_places=2, default_currency='USD', verbose_name='Start price')
    end_price = MoneyField(max_digits=14, decimal_places=2, default_currency='USD', verbose_name='End price')
    auction_status = models.CharField(max_length=255, choices=status_choices, verbose_name='Auction Status')
    frequency = models.IntegerField() # how often should we update the price