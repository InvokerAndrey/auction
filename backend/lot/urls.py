from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns

from . import views


urlpatterns = [
    path('list/', views.LotListView.as_view(), name='lot-list'),
    path('<int:pk>/', views.LotDetailView.as_view(), name='lot-detail'),
    path('<int:pk>/make-offer/', views.MakeOffer.as_view(), name='lot-detail'),
]

urlpatterns = format_suffix_patterns(urlpatterns)
