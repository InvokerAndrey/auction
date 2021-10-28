from django.db.models import F, Q
from django.shortcuts import get_object_or_404
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status

from .models import Auction
from .serializers import AuctionSerializer
from .enums import AuctionStatusEnum, AuctionTypeEnum
from core.views import BaseDetailView
from core.views import Pagination
from .tasks import change_auction_status
from offer.serializers import CreateOfferSerializer


class AuctionListView(APIView):
    def get(self, request, format=None):
        params = request.query_params
        filter_params = Q()

        if params.get('status'):
            status = params.get('status')
            if status in [i.value for i in AuctionStatusEnum]:
                filter_params &= Q(auction_status=status)
        if params.get('type'):
            type = params.get('type')
            if type in [i.value for i in AuctionTypeEnum]:
                filter_params &= Q(type=type)

        auction_qs = Auction.objects.filter(filter_params).order_by(F('closing_date') - F('opening_date'), 'end_price')

        paginator = Pagination()
        page = paginator.paginate_queryset(auction_qs, request)
        serializer = AuctionSerializer(page, many=True)
        return paginator.get_paginated_response(serializer.data)


class AuctionDetailView(BaseDetailView):
    model = Auction
    model_serializer = AuctionSerializer


class MakeOffer(APIView):
    def post(self, request, pk, format=None):
        context = {
            'user': request.user,
            'auction_pk': pk
        }
        offer_serializer = CreateOfferSerializer(data=request.data, context=context)
        if offer_serializer.is_valid():
            offer_serializer.save()
            print('VALIDATED_DATA:', offer_serializer.validated_data)
            # TODO: validated_data vs data
            
            return Response(status=201)
        else:
            return Response({'detail': offer_serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
