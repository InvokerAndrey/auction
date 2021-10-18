from django.http import Http404
from django.db.models import F
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.pagination import LimitOffsetPagination
from rest_framework.decorators import api_view

from .models import Auction
from .serializers import AuctionSerializer


class AuctionListView(APIView):

    pagination_class = LimitOffsetPagination
    page_size = 1

    def get(self, request, format=None):
        auction_list = Auction.objects.order_by(F('closing_date') - F('opening_date'), 'end_price')
        serializer = AuctionSerializer(auction_list, many=True)
        return Response(serializer.data)


class AuctionDetailView(APIView):
    
    def get_auction(self, pk):
        try:
            return Auction.objects.get(pk=pk)
        except Auction.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        auction = self.get_auction(pk)
        serializer = AuctionSerializer(auction, many=False)
        return Response(serializer.data)

    def put(self, request, pk, format=None):
        auction = self.get_auction(pk)
        serializer = AuctionSerializer(auction, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        auction = self.get_auction(pk)
        auction.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


@api_view(['GET'])
def get_english_auctions(request):
    english_auctions = Auction.objects.filter(type='ENGLISH')
    serializer = AuctionSerializer(english_auctions, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def get_dutch_auctions(request):
    dutch_auctions = Auction.objects.filter(type='DUTCH')
    serializer = AuctionSerializer(dutch_auctions, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def get_pending_auctions(request):
    pending_auctions = Auction.objects.filter(auction_status='PENDING')
    serializer = AuctionSerializer(pending_auctions, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def get_in_progress_auctions(request):
    in_progress_auctions = Auction.objects.filter(auction_status='IN_PROGRESS')
    serializer = AuctionSerializer(in_progress_auctions, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def get_closed_auctions(request):
    closed_auctions = Auction.objects.filter(auction_status='CLOSED')
    serializer = AuctionSerializer(closed_auctions, many=True)
    return Response(serializer.data)