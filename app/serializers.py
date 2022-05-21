from rest_framework_gis.serializers import GeoFeatureModelSerializer
from rest_framework.serializers import ModelSerializer
from . models import Hoppers, SuitablityRaster, GraphImg, ParamRaster
from django.contrib.gis.gdal import GDALRaster


class HoppersSerializer(GeoFeatureModelSerializer):
    class Meta:
        model = Hoppers
        geo_field = 'point'
        fields = '__all__'

class SuitablityRasterSerializer(ModelSerializer):
    def create(self, validated_data):
        if 'raster' in validated_data.keys():
            print(validated_data)
            raster = validated_data['raster']
            validated_data.pop('raster')
        gdal_raster = GDALRaster(raster, write=True)
        return SuitablityRaster.objects.create(raster=gdal_raster, **validated_data)


    class Meta:
        model = SuitablityRaster
        fields = '__all__'



class GraphImgSerializer(ModelSerializer):
    class Meta:
        model = GraphImg
        fields = '__all__'


class ParamRasterSerializer(ModelSerializer):
    class Meta:
        model = ParamRaster
        fields = '__all__'
