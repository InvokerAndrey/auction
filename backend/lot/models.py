from django.db import models

from item.models import Item
from auction.models import Auction


class Lot(models.Model):
    item = models.ForeignKey(Item, on_delete=models.CASCADE)
    auction = models.OneToOneField(Auction, on_delete=models.CASCADE)

    def __str__(self):
        return f'Lot: {self.item.title}, {self.auction.type}'
