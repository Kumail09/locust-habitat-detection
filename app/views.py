from django.shortcuts import render
from rest_framework import viewsets
from . serializers import HoppersSerializer, SuitablityRasterSerializer, ParamRasterSerializer, GraphImgSerializer
from . models import Hoppers, SuitablityRaster, ParamRaster, GraphImg
from rest_framework.decorators import action


def Map(request):
    return render(request, 'map/map.html')


class HoppersViewSet(viewsets.ModelViewSet):
    serializer_class = HoppersSerializer
    queryset = Hoppers.objects.all()


class SuitablityRasterViewSet(viewsets.ModelViewSet):
    serializer_class = SuitablityRasterSerializer
    queryset = SuitablityRaster.objects.all()
    
class ParamRasterViewSet(viewsets.ModelViewSet):
    serializer_class = ParamRasterSerializer
    queryset = ParamRaster.objects.all()


class GraphImgViewSet(viewsets.ModelViewSet):
    serializer_class = GraphImgSerializer
    queryset = GraphImg.objects.all()
