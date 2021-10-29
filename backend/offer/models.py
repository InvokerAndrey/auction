from django.db import models
from django.contrib.auth.models import User
from djmoney.models.fields import MoneyField

from auction.models import Auction


class Offer(models.Model):
    auction = models.ForeignKey(Auction, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    price = MoneyField(
        max_digits=14,
        decimal_places=2,
        default_currency='USD',
        verbose_name='Reserve price',
        null=True,
        blank=True
    )
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'Offer: {self.auction}, {self.user.username}'
