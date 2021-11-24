from celery import shared_task
from django.utils import timezone
from django.db import transaction

import datetime

from .enums import AuctionStatusEnum, AuctionTypeEnum
from .models import Auction


@shared_task
def start_auction(pk):
    print('NOW:', timezone.now())
    print('START_AUCTION TASK')
    auction = Auction.objects.get(pk=pk)
    if auction.auction_status != AuctionStatusEnum.PENDING.value:
        print(f'{AuctionTypeEnum.get_name_by_value(auction.type)} AUCTION IS NOT PENDING')
        return
    elif (timezone.now() - auction.opening_date).total_seconds() >= 0:
        with transaction.atomic():
            auction.auction_status = AuctionStatusEnum.IN_PROGRESS.value
            auction.end_price = auction.start_price
            auction.save()
            transaction.on_commit(lambda: auction.send_updates())
        if auction.type == AuctionTypeEnum.DUTCH.value:
            next_call_date = timezone.now() + datetime.timedelta(minutes=auction.frequency)
            decrease_price.apply_async((pk,), eta=next_call_date)
        print(f'{AuctionTypeEnum.get_name_by_value(auction.type)} AUCTION {auction.id} STARTED')
    else:
        print('HMM..')
        return


@shared_task
def close_english_auction(pk):
    print('NOW:', timezone.now())
    print('CLOSE_AUCTION TASK')
    auction = Auction.objects.get(pk=pk)
    if auction.auction_status == AuctionStatusEnum.CLOSED.value:
        print('ENGLISH AUCTION IS ALREADY CLOSED')
        return
    elif (timezone.now() - auction.closing_date).total_seconds() >= 0:
        auction.auction_status = AuctionStatusEnum.CLOSED.value
        auction.save()
        auction.send_updates()
        print(f'ENGLISH AUCTION {auction.id} CLOSED')
    else:
        print('NOT YET')
        return


@shared_task
def close_dutch_auction(pk):
    auction = Auction.objects.get(pk=pk)
    if auction.type != AuctionTypeEnum.DUTCH.value:
        print(f'{auction.id} NOT DUTCH')
        return
    elif auction.auction_status == AuctionStatusEnum.CLOSED.value:
        print(f'DUTCH AUCTION {auction.id} ALREADY CLOSED')
        return
    elif auction.end_price <= auction.reserve_price:
        with transaction.atomic():
            auction.auction_status = AuctionStatusEnum.CLOSED.value
            auction.save()
            transaction.on_commit(lambda: auction.send_updates())
        print(f'DUTCH AUCTION {auction.id} CLOSED')
        return
    elif auction.is_bought:
        with transaction.atomic():
            auction.auction_status = AuctionStatusEnum.CLOSED.value
            auction.is_bought = True
            auction.save()
            transaction.on_commit(lambda: auction.send_updates())
        print(f'LOT {auction.lot.id} HAS BEEN SOLD')
        print(f'DUTCH AUCTION {auction.id} HAS BEEN CLOSED')
        return


@shared_task()
def decrease_price(pk):
    print('ENTER decrease task')
    try:
        auction = Auction.objects.get(pk=pk, type=AuctionTypeEnum.DUTCH.value, auction_status=AuctionStatusEnum.IN_PROGRESS.value)
    except Auction.DoesNotExist:
        return
    if auction.end_price <= auction.reserve_price:
        close_dutch_auction.delay(pk=pk)
        return
    with transaction.atomic():
        auction.end_price -= auction.price_step
        auction.save()
        transaction.on_commit(lambda: auction.send_updates())
    next_call_date = timezone.now() + datetime.timedelta(minutes=auction.frequency)
    print('next call time:', next_call_date)
    print(f'AUCTION {pk} PRICE HAS DECREASED to {auction.end_price}')
    # reinvoke self
    decrease_price.apply_async((pk,), eta=next_call_date)
