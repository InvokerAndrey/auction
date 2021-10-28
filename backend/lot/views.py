from .models import Lot
from .serializers import LotSerializer
from core.views import BaseListView, BaseDetailView


class LotListView(BaseListView):
    model = Lot
    model_serializer = LotSerializer


class LotDetailView(BaseDetailView):
    model = Lot
    model_serializer = LotSerializer
