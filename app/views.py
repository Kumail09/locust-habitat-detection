from django.shortcuts import render
from rest_framework import viewsets
from . serializers import HoppersSerializer, RegionSerializer, SuitablityRasterSerializer, ParamRasterSerializer, GraphImgSerializer
from . models import Hoppers, SuitablityRaster, ParamRaster, GraphImg, Region
from rest_framework.decorators import action


def Map(request):
    return render(request, 'map/map.html')


# class HoppersViewSet(viewsets.ModelViewSet):
#     serializer_class = HoppersSerializer
#     queryset = Hoppers.objects.all()


# class SuitablityRasterViewSet(viewsets.ModelViewSet):
#     serializer_class = SuitablityRasterSerializer
#     queryset = SuitablityRaster.objects.all()
    
# class ParamRasterViewSet(viewsets.ModelViewSet):
#     serializer_class = ParamRasterSerializer
#     queryset = ParamRaster.objects.all()


# class GraphImgViewSet(viewsets.ModelViewSet):
#     serializer_class = GraphImgSerializer
#     queryset = GraphImg.objects.all()

from django.contrib.gis.geos import Point
from django.http import HttpResponse
from rest_framework import viewsets, status
from rest_framework.decorators import action
import json

class RegionViewSet(viewsets.ModelViewSet):
    serializer_class = RegionSerializer
    queryset = Region.objects.all()

    @action(detail=False, methods=['get'])
    def get_name(self, request, *args, **kwargs):
        lat = float(request.GET.get('lat', None))
        lng = float(request.GET.get('lng', None))
        pnt = Point(lat, lng)
        ret = Region.objects.filter(geom__contains=pnt)
        if ret:
            returnDict = {'name' : ret[0]['name']}
            return HttpResponse(json.dumps(returnDict), status=status.HTTP_200_OK, content_type='application/json')
        return HttpResponse(json.dumps({'name':None}), status=status.HTTP_200_OK, content_type='application/json')
