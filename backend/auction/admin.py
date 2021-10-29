from django.contrib import admin
from django.db import transaction
from django.db import transaction

from .models import Auction
from lot.models import Lot
from .tasks import start_auction, close_auction


class LotInline(admin.TabularInline):
    model = Lot


class AuctionAdmin(admin.ModelAdmin):
    inlines = (
        LotInline,
    )

    @transaction.atomic
    def save_model(self, request, obj, form, change):
        super().save_model(request, obj, form, change)

        # Will be True if this is a change on an existing model, it is False if the model is a newly created instance
        if change and 'closing_date' in form.changed_data:
            print('form.changed_data:', form.changed_data)
            transaction.on_commit(lambda: close_auction.apply_async((obj.pk, ), eta=obj.closing_date))
        elif not change:
            transaction.on_commit(lambda: start_auction.apply_async((obj.pk, ), eta=obj.opening_date))
            transaction.on_commit(lambda: close_auction.apply_async((obj.pk, ), eta=obj.closing_date))



admin.site.register(Auction, AuctionAdmin)
