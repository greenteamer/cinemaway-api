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
    return render(request, 'core/index.html', {
        'user': request.user
    })


def mailer(request):
    if request.POST.get('request', None):
        requestObj = UserRequest.objects.get(id=request.POST['request'])
        context_dict = {
            'id': requestObj.id,
            'request': requestObj,
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
