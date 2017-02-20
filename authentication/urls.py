from django.conf.urls import url
from authentication import views


urlpatterns = [
    #  url(r'^profile/$', views.profile, name="profile"),
    #  url(r'^profile/vacancies/$', views.profile, name="profile"),
    url(r'^profile/', views.profile, name="profile"),
    url(r'^all/', views.profile, name="profile"),
    url(r'^vacancies/', views.profile, name="profile"),
    url(r'^rents/', views.profile, name="profile"),
    url(r'^rubrics/', views.profile, name="profile"),
    url(r'^users/', views.profile, name="profile"),
]
