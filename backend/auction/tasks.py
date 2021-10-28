from celery import shared_task

from django.utils import timezone
import pickle

from .enums import AuctionStatusEnum
from . import models


@shared_task
def close_auction():
    now = timezone.now()
    print('----------', now)
    try:
        with open('auction/dates.pkl', 'rb') as file:
            dates = pickle.load(file)
    except FileNotFoundError:
        return

    print(dates)

    for id in list(dates.keys()):
        if now >= dates[id]:
            print('CHANGING STATUS')
            models.Auction.objects.filter(pk=id).update(auction_status=AuctionStatusEnum.CLOSED.value)
            print('STATUS CHANGED')
            del dates[id]

    with open('auction/dates.pkl', 'wb') as file:
        pickle.dump(dates, file)


@shared_task
def change_auction_status(pk, auction_status):
    try:
        auction = models.Auction.objects.get(pk=pk)
        models.Auction.change_status(auction, auction_status)
    except models.Auction.DoesNotExist:
        raise models.Auction.DoesNotExist('Invalid auction')
