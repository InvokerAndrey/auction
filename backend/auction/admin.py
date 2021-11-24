from django.contrib import admin
from django.db import transaction
from django.utils import timezone

import math
import datetime

from .models import Auction
from lot.models import Lot
from .tasks import start_auction, close_english_auction, close_dutch_auction
from .enums import AuctionTypeEnum


class LotInline(admin.TabularInline):
    model = Lot


class AuctionAdmin(admin.ModelAdmin):
    fields = [
        'type',
        'start_price',
        'auction_status',
        'opening_date',
        'closing_date',
        'is_bought',
        'reserve_price',
        'frequency'
    ]
    inlines = (
        LotInline,
    )

    @transaction.atomic
    def save_model(self, request, obj, form, change):
        super().save_model(request, obj, form, change)
        # Will be True if this is a change on an existing model, it is False if the model is a newly created instance
        if change and 'closing_date' in form.changed_data:
            if obj.type == AuctionTypeEnum.ENGLISH.value:
                transaction.on_commit(lambda: close_english_auction.apply_async((obj.pk, ), eta=obj.closing_date))
            elif obj.type == AuctionTypeEnum.DUTCH.value:
                self.close_dutch(obj)
        if change and 'opening_date' in form.changed_data:
            transaction.on_commit(lambda: start_auction.apply_async((obj.pk,), eta=obj.opening_date))
        if not change:
            transaction.on_commit(lambda: start_auction.apply_async((obj.pk,), eta=obj.opening_date))
            if obj.type == AuctionTypeEnum.ENGLISH.value:
                transaction.on_commit(lambda: close_english_auction.apply_async((obj.pk,), eta=obj.closing_date))
            elif obj.type == AuctionTypeEnum.DUTCH.value:
                self.close_dutch(obj)
        # Update UI asyncly
        transaction.on_commit(lambda: obj.send_updates())

    def close_dutch(self, obj):
        max_duration = math.ceil(((obj.start_price - obj.reserve_price) / obj.price_step) * obj.frequency)
        check_to_close_at = obj.opening_date + datetime.timedelta(minutes=max_duration)
        print('opening_date:', obj.opening_date)
        print('max_duration:', max_duration)
        print('check_to_close_at:', check_to_close_at)
        transaction.on_commit(lambda: close_dutch_auction.apply_async((obj.pk,), eta=check_to_close_at))


admin.site.register(Auction, AuctionAdmin)
