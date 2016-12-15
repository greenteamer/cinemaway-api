from django.conf.urls import url, include
from django.contrib import admin
from django.conf.urls.static import static
from django.conf import settings
from rest_framework import routers
from restapi import views as viewsets
admin.autodiscover()


router = routers.DefaultRouter()
router.register(r'workers', viewsets.WorkerViewSet)
router.register(r'employers', viewsets.EmployerViewSet)


urlpatterns = [
    url(r'^admin/', admin.site.urls),
    url(r'^ckeditor/', include('ckeditor_uploader.urls')),
    url(r'^api/v1/', include(router.urls)),
    url(r'^api-auth/', include('rest_framework.urls', namespace='rest_framework'))
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
