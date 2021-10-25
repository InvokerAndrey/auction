from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns

from . import views


urlpatterns = [
    path('list/', views.AuctionListView.as_view(), name='auction-list'),
    path('<int:pk>/', views.AuctionDetailView.as_view(), name='auction-detail'),
    path('<int:pk>/change-status/', views.ChangeStatus.as_view(), name='auction-change-status'),
]

urlpatterns = format_suffix_patterns(urlpatterns)
