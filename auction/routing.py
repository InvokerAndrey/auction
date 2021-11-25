from django.urls import re_path, path

from . import consumers


websocket_urlpatterns = [
    # re_path(r"ws/auction/(?P<room_name>\w+)/$", consumers.AuctionConsumer.as_asgi()),
    path('ws/auction/', consumers.AuctionConsumer.as_asgi())
]