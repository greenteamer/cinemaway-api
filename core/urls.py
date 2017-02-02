from django.conf.urls import url
from core import views


urlpatterns = [
    url(r'^$', views.index, name="index"),
    url(r'^rubrics/(?P<id>[-\w]+)/$', views.index, name="index"),
    url(r'^auth/$', views.index, name="index"),
    url(r'^send-mail/$', views.mailer, name="mailer"),
    # url(r'^oauth/facebook/$', views.facebook, name="facebook"),
    # url(r'^oauth/success/$', views.success, name="success"),
]
