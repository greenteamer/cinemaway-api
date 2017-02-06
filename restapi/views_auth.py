# -*- coding: utf-8 -*-
from rest_framework import views
from django.core.exceptions import ObjectDoesNotExist
from django.contrib.auth import login, logout, authenticate
from django.contrib.auth.models import Group
from django.shortcuts import HttpResponse
from rest_framework.authtoken.models import Token
from rest_framework.renderers import JSONRenderer
import ast
import json
#  from authentication.utils import generate_random_username
from restapi.serializers import serializers
from django.contrib.auth import get_user_model
User = get_user_model()


def logout_user(request):
    try:
        logout(request)
        data = json.dumps(None)
        return HttpResponse(data, content_type='application/json')
    except Exception:
        data = json.dumps(None)
        return HttpResponse(data, content_type='application/json')


def login_user(request):
    data = {}
    if request.method == 'POST':
        body = ast.literal_eval(request.body)
        try:
            if body['email'] == "":
                raise Exception('Пустое поле email')
            test = User.objects.get(email=body['email'])
            print "Password check passes?"
            print "%s" % test.check_password(body['password'])  # Logs True!!!
            user = authenticate(email=body['email'], password=body['password'])
            if user is not None:
                # логинем пользователя
                login(request, user)
                s_user = serializers.UserSZ(user, context={'request': request})
                data = JSONRenderer().render(s_user.data)
            else:
                data = json.dumps(None)
        except Exception:
            data = json.dumps(None)
    return HttpResponse(data, content_type='application/json')


def registration_user(request):
    data = {}
    if request.method == 'POST':
        body = ast.literal_eval(request.body)
        # пытаемся получить пользователя по email
        try:
            if body['email'] == "":
                raise Exception('** Пустое поле email')
            User.objects.get(email=body['email'])
            print "** User with '%s' email exist" % body['email']
            data = json.dumps(None)
            return HttpResponse(data, content_type='application/json')
        # если пользовательн не существует - создаем его
        except ObjectDoesNotExist, e:
            if body['email'] == "":
                raise Exception('** Пустое поле email')
            user = User.objects.create_user(body['email'], body['password1'])
            # логиним пользователя
            login(request, user)
            # создаем ему токен в куки
            Token.objects.get_or_create(user=user)
            # создаем профиль пользователю
            # profile = Profile(owner=user)
            # profile.save()
            # сериализуем пользователя и его проифиль
            s_user = serializers.UserSZ(user, context={'request': request})
            data = JSONRenderer().render(s_user.data)
        except Exception, e:
            print "** error: %s" % e
            data = json.dumps(None)
    return HttpResponse(data, content_type='application/json')


class CurrentUserView(views.APIView):
    queryset = User.objects.all()

    def get(self, request):
        if request.user.is_authenticated:
            data = json.dumps({
                "id": request.user.id,
                # "username": request.user.username,
                "email": request.user.email,
            })
            return HttpResponse(data, content_type='application/json')
        else:
            data = json.dumps(None)
            return HttpResponse(data, content_type='application/json')


def set_group_user_view(request):
    group_name = request.POST.get('group', '')
    try:
        group = Group.objects.get(name=group_name)
        if request.user.groups.length != 0:
            request.user.groups.add(group.id)
            s_user = serializers.UserSZ(request.user, context={'request': request})
            data = JSONRenderer().render(s_user.data)
            return HttpResponse(data, content_type='application/json')
        else:
            data = json.dumps(None)
            return HttpResponse(data, content_type='application/json')
    except Exception:
        data = json.dumps(None)
        return HttpResponse(data, content_type='application/json')
