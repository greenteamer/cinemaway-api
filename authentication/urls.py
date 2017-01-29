from django.conf.urls import url
from authentication import views


urlpatterns = [
    url(r'^profile/$', views.profile, name="profile"),
    url(r'^profile/vacancies/$', views.profile, name="profile"),
]
