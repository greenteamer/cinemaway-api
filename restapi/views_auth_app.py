# -*- coding: utf-8 -*-
#  from rest_framework import views
from django.core.exceptions import ObjectDoesNotExist
from django.contrib.auth import login, logout, authenticate
#  from django.contrib.auth.models import Group
from django.shortcuts import HttpResponse
from rest_framework.authtoken.models import Token
from rest_framework.renderers import JSONRenderer
from django.views.decorators.csrf import csrf_exempt
#  from project.settings import HOST

import ast
import json
#  from authentication.utils import generate_random_username
#  from restapi.serializers import serializers
from django.contrib.auth import get_user_model
User = get_user_model()


@csrf_exempt
def logout_user_app(request):
    try:
        logout(request)
        data = json.dumps(None)
        return HttpResponse(data, content_type='application/json')
    except Exception:
        data = json.dumps(None)
        return HttpResponse(data, content_type='application/json')


@csrf_exempt
def login_user_app(request):
    data = {}
    if request.method == 'POST':
        body = ast.literal_eval(request.body)
        try:
            if body['email'] == "":
                raise Exception('Пустое поле email')
            user = authenticate(email=body['email'], password=body['password'])
            if user is not None:
                login(request, user)
                token = Token.objects.get_or_create(user=user)
                data = JSONRenderer().render({"token": token[0].key})
            else:
                data = json.dumps(None)
        except Exception:
            data = json.dumps(None)
    return HttpResponse(data, content_type='application/json')


@csrf_exempt
def registration_user_app(request):
    data = {}
    if request.method == 'POST':
        body = ast.literal_eval(request.body)
        try:
            if body['email'] == "":
                raise Exception('** Пустое поле email')
            User.objects.get(email=body['email'])
            data = json.dumps(None)
            return HttpResponse(data, content_type='application/json')
        except ObjectDoesNotExist:
            if body['email'] == "":
                raise Exception('** Пустое поле email')
            user = User.objects.create_user(body['email'], body['password1'])
            login(request, user)
            token = Token.objects.get_or_create(user=user)
            data = JSONRenderer().render({"token": token[0].key})
        except Exception:
            data = json.dumps(None)
    return HttpResponse(data, content_type='application/json')
