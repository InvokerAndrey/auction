from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns

from . import views


urlpatterns = [
    path('list/', views.AuctionListView.as_view(), name='auction-list'),
    path('list/english/', views.get_english_auctions, name='auction-list-english'),
    path('list/dutch/', views.get_dutch_auctions, name='auction-list-dutch'),
    path('list/pending/', views.get_pending_auctions, name='auction-list-pending'),
    path('list/in-progress/', views.get_in_progress_auctions, name='auction-list-in-progress'),
    path('list/closed/', views.get_closed_auctions, name='auction-list-closed'),
    path('<int:pk>/', views.AuctionDetailView.as_view(), name='auction-detail'),
]

urlpatterns = format_suffix_patterns(urlpatterns)
