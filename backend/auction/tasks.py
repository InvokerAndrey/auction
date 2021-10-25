from celery import shared_task

from .models import Auction


@shared_task
def change_auction_status(pk, auction_status):
    try:
        auction = Auction.objects.get(pk=pk)
        Auction.change_status(auction, auction_status)
    except Auction.DoesNotExist:
        raise Auction.DoesNotExist('Invalid auction')
