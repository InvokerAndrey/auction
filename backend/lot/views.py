from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from .models import Lot
from .serializers import LotSerializer
from core.views import BaseListView, BaseDetailView
from offer.serializers import OfferSerializer


class LotListView(BaseListView):
    model = Lot
    model_serializer = LotSerializer


class LotDetailView(BaseDetailView):
    model = Lot
    model_serializer = LotSerializer


class MakeOffer(APIView):
    def post(self, request, pk, format=None):
        data = request.data
        data['user'] = request.user.pk
        data['lot'] = pk

        offer_serializer = OfferSerializer(data=data)
        if offer_serializer.is_valid():
            offer_serializer.save()
            print(offer_serializer.validated_data)
            return Response('Offer has been made')
        else:
            return Response({'detail': offer_serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
