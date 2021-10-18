from django.http import Http404
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status

from .models import Lot
from .serializers import LotSerializer


class LotListView(APIView):

    def get(self, request, format=None):
        lot_list = Lot.objects.all()
        serializer = LotSerializer(lot_list, many=True)
        return Response(serializer.data)


class LotDetailView(APIView):
    
    def get_lot(self, pk):
        try:
            return Lot.objects.get(pk=pk)
        except Lot.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        lot = self.get_lot(pk)
        serializer = LotSerializer(lot, many=False)
        return Response(serializer.data)

    def put(self, request, pk, format=None):
        lot = self.get_lot(pk)
        serializer = LotSerializer(lot, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        lot = self.get_lot(pk)
        lot.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
