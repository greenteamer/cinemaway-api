from django.conf.urls import url, include
from django.contrib import admin
from django.conf.urls.static import static
from django.conf import settings
from rest_framework import routers
from restapi import views as viewsets, views_auth, views_common
admin.autodiscover()


router = routers.DefaultRouter()
router.register(r'users', viewsets.UserViewSet)
router.register(r'resumes', viewsets.ResumeViewSet)
router.register(r'companies', viewsets.CompanyViewSet)
#  router.register(r'profiles', viewsets.ProfileViewSet)
router.register(r'rubrics', viewsets.RubricViewSet)
router.register(r'rent-rubrics', viewsets.RentRubricViewSet)
router.register(r'vacancies', viewsets.VacancyViewSet)
router.register(r'rents', viewsets.RentViewSet)
router.register(r'requests', viewsets.UserRequestViewSet)
router.register(r'responses', viewsets.UserResponseViewSet)
router.register(r'messages', viewsets.MessageViewSet)
router.register(r'rooms', viewsets.RoomViewSet)


urlpatterns = [
    url(r'^admin/', admin.site.urls),
    url(r'^ckeditor/', include('ckeditor_uploader.urls')),

    url(r'^', include('authentication.urls')),
    url(r'^api/v1/', include(router.urls)),
    url(r'^api/v1/current-user/$', views_auth.CurrentUserView.as_view(), name="current_user"),
    url(r'^api/v1/all-data/$', views_common.all_data, name="all_data"),
    url(r'^api/v1/login/$', views_auth.login_user, name="login_user"),
    url(r'^api/v1/logout/$', views_auth.logout_user, name="logout_user"),
    url(r'^api/v1/set-group/$', views_auth.set_group_user_view, name="set_group_user_view"),
    url(r'^api/v1/registration/$', views_auth.registration_user, name="registration_user"),

    url(r'^authentication/', include('authentication.urls')),
    url(r'^', include('core.urls')),

] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
