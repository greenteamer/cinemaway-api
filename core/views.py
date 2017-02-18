# -*- coding: utf-8 -*-
#  import json
from django.shortcuts import render
from django.shortcuts import redirect
from django.views.decorators.csrf import ensure_csrf_cookie
from project.settings import ADMIN_EMAIL
# from django_ipgeobase.models import IPGeoBase
from core.models import UserRequest, UserResponse
from rest_framework.authtoken.models import Token
from django.shortcuts import HttpResponse
from rest_framework.renderers import JSONRenderer
from django.core.mail import EmailMultiAlternatives
from django.template.loader import render_to_string
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


# @ensure_csrf_cookie
def mailer(request):
    #  received_json_data = json.loads(request.body)
    #  received_json_data = request.POST
    if request.POST.get('request', None):
        requestObj = UserRequest.objects.get(id=request.POST['request'])
        context_dict = {
            'id': requestObj.id,
            'vacancy': requestObj.vacancy.name,
        }

        send_mail_func('core/email_request_owner.html', context_dict, requestObj.owner.email)
        send_mail_func('core/email_request_object.html', context_dict, requestObj.object.email)

    if request.POST.get('response', None):
        responseObj = UserResponse.objects.get(id=request.POST['response'])
        context_dict = {
            'request': responseObj.userRequest,
            'response': responseObj,
        }

        send_mail_func('core/email_response_owner.html', context_dict, responseObj.userRequest.owner.email)

    #  ownerEMail = User.objects.get(id=int(received_json_data['owner'])).email
    #  objectEMail = User.objects.get(id=int(received_json_data['object'])).email
    #  subject = u'Уведомление cw'
    #  message = u'Новые действия на сайте'
    #  send_mail(subject, message, ADMIN_EMAIL, [ownerEMail, objectEMail], fail_silently=False)
    response_object = {
        'response': 'ok'
    }
    response_data = JSONRenderer().render(response_object)
    return HttpResponse(response_data, content_type='application/json')


def facebook(request):
    return render(request, 'core/facebook.html')


def success(request):
    print "%s: " % request
    token = Token.objects.get_or_create(user=request.user)
    url = '/success?token=%s' % token[0].key
    return redirect(url)


def send_mail_func(template, context_dict, email):
    subject = u'Уведомление Cinemaway'
    message = render_to_string(
        template,
        context_dict,
    )
    #  send_mail(subject, message, ADMIN_EMAIL, [requestObj.owner.email, requestObj.object.email], fail_silently=False)
    msg = EmailMultiAlternatives(subject, message, ADMIN_EMAIL, [email])
    msg.content_subtype = "html"
    msg.send()
