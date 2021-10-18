from django.contrib import admin

from .models import Auction
from lot.models import Lot


class LotInline(admin.TabularInline):
    model = Lot


class AuctionAdmin(admin.ModelAdmin):
    inlines = (
        LotInline,
    )
    

admin.site.register(Auction, AuctionAdmin)
