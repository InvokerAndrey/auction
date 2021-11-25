from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns

from . import views


urlpatterns = [
    path('list/', views.ItemListView.as_view(), name='item-list'),
    path('<int:pk>/', views.ItemDetailView.as_view(), name='item-detail'),
]

urlpatterns = format_suffix_patterns(urlpatterns)
