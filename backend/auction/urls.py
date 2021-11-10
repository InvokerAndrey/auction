from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns

from . import views


urlpatterns = [
    path('list/', views.AuctionListView.as_view(), name='auction-list'),
    path('create/', views.CreateAuctionView.as_view(), name='auction-create'),
    path('<int:pk>/', views.AuctionDetailView.as_view(), name='auction-detail'),
    path('<int:pk>/make-offer/', views.MakeOffer.as_view(), name='make-offer'),
    path('<int:pk>/recent-offers/', views.AuctionRecentOffersView.as_view(), name='recent-offers'),
]

urlpatterns = format_suffix_patterns(urlpatterns)
