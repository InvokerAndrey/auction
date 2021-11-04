from django.contrib import admin
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

        json_response = {
            'id': obj.id,
            'auction_status': obj.auction_status,
            'end_price': str(obj.end_price.amount),
            'opening_date': str(obj.opening_date),
            'closing_date': str(obj.closing_date),
        }

        # Will be True if this is a change on an existing model, it is False if the model is a newly created instance
        if change and 'closing_date' in form.changed_data:
            transaction.on_commit(lambda: close_auction.apply_async((obj.pk, ), eta=obj.closing_date))
        if change and 'opening_date' in form.changed_data:
            transaction.on_commit(lambda: start_auction.apply_async((obj.pk,), eta=obj.opening_date))
        if not change:
            transaction.on_commit(lambda: start_auction.apply_async((obj.pk, ), eta=obj.opening_date))
            transaction.on_commit(lambda: close_auction.apply_async((obj.pk, ), eta=obj.closing_date))

        # Update UI asyncly
        transaction.on_commit(lambda: Auction().send_updates(content=json_response))


admin.site.register(Auction, AuctionAdmin)
