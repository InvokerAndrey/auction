from .models import Item
from .serializers import ItemSerializer
from core.views import BaseListView, BaseDetailView


class ItemListView(BaseListView):
    model = Item
    model_serializer = ItemSerializer


class ItemDetailView(BaseDetailView):
    model = Item
    model_serializer = ItemSerializer
