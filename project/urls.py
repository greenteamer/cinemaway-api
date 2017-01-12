from django.conf.urls import url, include
from django.contrib import admin
from django.conf.urls.static import static
from django.conf import settings
from rest_framework import routers
from restapi import views as viewsets, views_auth, views_common
admin.autodiscover()


router = routers.DefaultRouter()
router.register(r'users', viewsets.UserViewSet)
router.register(r'profiles', viewsets.ProfileViewSet)


urlpatterns = [
    url(r'^admin/', admin.site.urls),
    url(r'^ckeditor/', include('ckeditor_uploader.urls')),
    url(r'^', include('authentication.urls')),
    url(r'^api/v1/', include(router.urls)),
    url(r'^api/v1/current-user/$', views_auth.CurrentUserView.as_view(), name="current_user"),
    url(r'^api/v1/all-data/$', views_common.all_data, name="all_data"),
    url(r'^api/v1/login/$', views_auth.login_user, name="login_user"),
    url(r'^api/v1/logout/$', views_auth.logout_user, name="logout_user"),
    url(r'^api/v1/registration/$', views_auth.registration_user, name="registration_user"),
    # url(r'^api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    # url(r'^rest-auth/', include('rest_auth.urls')),
    # url(r'^accounts/', include('allauth.urls')),
    # url(r'^rest-auth/registration/', include('rest_auth.registration.urls')),
    # url(r'^api-token-auth/', 'rest_framework.authtoken.views.obtain_auth_token'),
    url(r'^authentication/', include('authentication.urls')),
    url(r'^', include('core.urls')),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
