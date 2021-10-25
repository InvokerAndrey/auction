from django.db import models
from django.contrib.auth.models import User
from djmoney.models.fields import MoneyField

from lot.models import Lot


class Offer(models.Model):
    lot = models.ForeignKey(Lot, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    price = MoneyField(
        max_digits=14,
        decimal_places=2,
        default_currency='USD',
        verbose_name='Reserve price',
        null=True,
        blank=True
    )
    timestamp = models.DateTimeField()

    def __str__(self):
        return f'Offer: {self.lot}, {self.user.username}'
