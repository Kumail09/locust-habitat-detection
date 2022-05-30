from django.urls import include, path
from rest_framework import routers
from . import views
from django.conf.urls.static import static
from django.conf import settings
from . import load_file


router = routers.DefaultRouter()

# -------------------->>>>>>>>>>>>>>>>>>>>>>>>----------------------
# router.register(r'hoppers', views.HoppersViewSet)
# router.register(r'suitability', views.SuitablityRasterViewSet)
# router.register(r'graph', views.GraphImgViewSet)
# router.register(r'params', views.ParamRasterViewSet)
router.register(r'region', views.RegionViewSet)

urlpatterns = [
                path('api/', include(router.urls)),
                path('map/', views.Map),
                path('upload_hoppers/', load_file.UploadVector),
              ] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

if settings.DEBUG:  # new
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
