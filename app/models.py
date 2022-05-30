from distutils.command.upload import upload
from django.contrib.gis.db import models as models
from django.conf import settings


class Hoppers(models.Model):
    id = models.BigAutoField(primary_key=True)
    date = models.DateTimeField()
    point = models.PointField()

class SuitablityRaster(models.Model):
    id = models.BigAutoField(primary_key=True)
    date = models.DateField()
    raster = models.RasterField(srid=4326)

class GraphImg(models.Model):
    suitablity_raster = models.ForeignKey(SuitablityRaster, on_delete=models.CASCADE)
    id = models.BigAutoField(primary_key=True)    
    type = models.CharField(max_length=255)
    graph = models.ImageField(upload_to='graphs/')


class ParamRaster(models.Model):
    suitablity_raster = models.ForeignKey(SuitablityRaster, on_delete=models.CASCADE)
    type = models.CharField(max_length=255)
    id = models.BigAutoField(primary_key=True)    
    raster = models.RasterField(srid=4326)


class Region(models.Model):
    id = models.BigAutoField(primary_key=True)    
    name = models.CharField(max_length=254)
    geom = models.MultiPolygonField(srid=4326)
