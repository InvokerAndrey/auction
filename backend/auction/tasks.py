from celery import shared_task
from django.utils import timezone

from .enums import AuctionStatusEnum
from .models import Auction


@shared_task
def start_auction(pk):
    print('NOW:', timezone.now())
    print('START_AUCTION TASK')
    auction = Auction.objects.get(pk=pk)
    if auction.auction_status != AuctionStatusEnum.PENDING.value:
        print('AUCTION IS NOT PENDING')
        return
    elif (timezone.now() - auction.opening_date).total_seconds() >= 0:
        auction.auction_status = AuctionStatusEnum.IN_PROGRESS.value
        auction.save()
        print('AUCTION STARTED!!!!!!!!!!')
    else:
        print('HMM..')
        return


@shared_task
def close_auction(pk):
    print('NOW:', timezone.now())
    print('CLOSE_AUCTION TASK')
    auction = Auction.objects.get(pk=pk)
    if auction.auction_status == AuctionStatusEnum.CLOSED.value:
        print('AUCTION IS ALREADY CLOSED')
        return
    elif (timezone.now() - auction.closing_date).total_seconds() >= 0:
        auction.auction_status = AuctionStatusEnum.CLOSED.value
        auction.save()
        print('AUCTION CLOSED!!!!!!!!!!')
    else:
        print('NOT YET')
        return
