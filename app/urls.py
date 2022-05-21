from django.urls import include, path
from rest_framework import routers
from . import views
from django.conf.urls.static import static
from django.conf import settings

router = routers.DefaultRouter()

# -------------------->>>>>>>>>>>>>>>>>>>>>>>>----------------------
router.register(r'hoppers', views.HoppersViewSet)
router.register(r'suitability', views.SuitablityRasterViewSet)
router.register(r'graph', views.GraphImgViewSet)
router.register(r'params', views.ParamRasterViewSet)


urlpatterns = [
                path('api/', include(router.urls)),
                path('map/', views.Map),
              ] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

if settings.DEBUG:  # new
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
