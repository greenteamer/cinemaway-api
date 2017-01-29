# -*- coding: utf-8 -*-
from django.shortcuts import render
from django.shortcuts import redirect
from django.views.decorators.csrf import ensure_csrf_cookie
# from django_ipgeobase.models import IPGeoBase
#  from core import utils
from rest_framework.authtoken.models import Token
from django.contrib.auth import get_user_model
User = get_user_model()


@ensure_csrf_cookie
def index(request, **kwargs):
    # ip = utils.get_client_ip(request)
    # if ip == '127.0.0.1':
    #     ip = '178.155.5.189'
    # print ip
    # ipgeobases = IPGeoBase.objects.by_ip(ip)
    # if ipgeobases.exists():
    #     ipgeobase = ipgeobases[0]
    #     print ipgeobase.country  # Страна
    #     print ipgeobase.district  # Округ (для указанного ip - Уральский)
    #     print ipgeobase.region  # Регион (Свердловская область)
    #     print ipgeobase.city  # Населенный пункт (Екатеринбург)
    #     print ipgeobase.ip_block  # IP-блок, в который попали (212.49.98.0 - 212.49.98.255)
    #     print ipgeobase.start_ip, ipgeobase.end_ip  # IP-блок в числовом формате
    #     print ipgeobase.latitude, ipgeobase.longitude  # широта и долгота

    #  user = User.objects.filter(id=request.user.id)

    #  perm = request.user.has_perm()
    #  print "perm: %s" % perm
    return render(request, 'core/index.html', {
        'user': request.user
    })


def facebook(request):
    return render(request, 'core/facebook.html')


def success(request):
    print "%s: " % request
    token = Token.objects.get_or_create(user=request.user)
    url = '/success?token=%s' % token[0].key
    return redirect(url)
