from django.shortcuts import get_object_or_404
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.pagination import PageNumberPagination


class Pagination(PageNumberPagination):
    def get_paginated_response(self, data):
        return Response(dict([
            ('page', self.page.number),
            ('count', self.page.paginator.count),
            ('results', data),
        ]))


class BaseListView(APIView):
    model = None
    model_serializer = None

    def get(self, request, format=None):
        paginator = Pagination()
        obj_qs = self.model.objects.all()
        page = paginator.paginate_queryset(obj_qs, request)
        serializer = self.model_serializer(page, many=True)
        return paginator.get_paginated_response(serializer.data)


class BaseDetailView(APIView):
    model = None
    model_serializer = None
    
    def get_obj(self, pk):
        return get_object_or_404(self.model, pk=pk)

    def get(self, request, pk, format=None):
        obj = self.get_obj(pk)
        serializer = self.model_serializer(obj, many=False)
        return Response(serializer.data)

    def put(self, request, pk, format=None):
        obj = self.get_obj(pk)
        serializer = self.model_serializer(obj, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        obj = self.get_obj(pk)
        obj.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
