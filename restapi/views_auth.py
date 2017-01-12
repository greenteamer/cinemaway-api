# -*- coding: utf-8 -*-
from rest_framework import views
from django.contrib.auth.models import User
from django.core.exceptions import ObjectDoesNotExist
from authentication import models as auth_models
from django.contrib.auth import login, logout, authenticate
from django.shortcuts import HttpResponse
from rest_framework.authtoken.models import Token
from rest_framework.renderers import JSONRenderer
# from allauth.socialaccount.models import SocialToken, SocialApp, SocialAccount
import ast
import json
from authentication.utils import generate_random_username
from restapi.serializers import serializers
from restapi.utils import serialize_data


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
            find_user = User.objects.get(email=body['email'])
            user = authenticate(username=find_user.username, password=body['password'])
            if user is not None:
                # логинем пользователя
                login(request, user)
                try:
                    # получаем профиль
                    profile = auth_models.Profile.objects.get(user=user.id)
                except ObjectDoesNotExist, e:
                    print "error: %s" % e
                    # создаем профиль если его еще нет
                    profile = auth_models.Profile(user=user)
                    profile.save()
                # сериализация пользователя и профиля для ответа сервера
                s_user = serializers.UserSZ(user, context={'request': request})
                # s_profile = serializers.ProfileSZ(profile, context={'request': request})
                # result_data = {
                #     "user": s_user.data,
                #     "profile": s_profile.data,
                # }
                # data = JSONRenderer().render(result_data)
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
            user = User.objects.create_user(generate_random_username(), body['email'], body['password1'])
            # логиним пользователя
            login(request, user)
            # создаем ему токен в куки
            Token.objects.get_or_create(user=user)
            # создаем профиль пользователю
            profile = auth_models.Profile(user=user)
            profile.save()
            # сериализуем пользователя и его проифиль
            s_user = serializers.UserSZ(user, context={'request': request})
            # s_profile = serializers.ProfileSZ(profile, context={'request': request})
            # result_data = {
            #     "user": s_user.data,
            #     "profile": s_profile.data,
            # }
            # data = JSONRenderer().render(result_data)
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
                "username": request.user.username,
                "email": request.user.email,
            })
            return HttpResponse(data, content_type='application/json')
        else:
            data = json.dumps(None)
            return HttpResponse(data, content_type='application/json')


