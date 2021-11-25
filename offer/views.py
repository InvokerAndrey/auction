from core.views import BaseListView
from .models import Offer
from .serializers import OfferSerializer


class OfferListView(BaseListView):
    model = Offer
    model_serializer = OfferSerializer
