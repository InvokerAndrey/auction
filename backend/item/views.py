from django.http import Http404
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status

from .models import Item
from .serializers import ItemSerializer


class ItemListView(APIView):

    def get(self, request, format=None):
        item_list = Item.objects.all()
        serializer = ItemSerializer(item_list, many=True)
        return Response(serializer.data)


class ItemDetailView(APIView):
    
    def get_item(self, pk):
        try:
            return Item.objects.get(pk=pk)
        except Item.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        item = self.get_item(pk)
        serializer = ItemSerializer(item, many=False)
        return Response(serializer.data)

    def put(self, request, pk, format=None):
        item = self.get_item(pk)
        serializer = ItemSerializer(item, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        item = self.get_item(pk)
        item.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
