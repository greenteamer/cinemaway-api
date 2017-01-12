# -*- coding: utf-8 -*-
from rest_framework import views
from django.contrib.auth.models import User
from authentication.models import Profile
from django.contrib.auth import login, logout, authenticate
from django.core.exceptions import ObjectDoesNotExist
from django.shortcuts import HttpResponse
from rest_framework.authtoken.models import Token
# from allauth.socialaccount.models import SocialToken, SocialApp, SocialAccount
# from django.core import serializers
from restapi.serializers.serializers import UserSZ, ProfileSZ
from rest_framework.renderers import JSONRenderer
import ast
import json
from authentication.utils import generate_random_username


def all_data(request):
    # сериализуем пользователя
    s_user = UserSZ(request.user, context={"request": request})
    try:
        # получаем профиль
        profile = Profile.objects.get(user=request.user.id)
    except ObjectDoesNotExist, e:
        print "error: %s" % e
        # создаем профиль если его еще нет
        profile = Profile(user=request.user)
        profile.save()
    # сериализация пользователя и профиля для ответа сервера
    s_profile = ProfileSZ(profile, context={"request": request})
    response_object = {
        "user": s_user.data,
        "profile": s_profile.data,
    }
    response_data = JSONRenderer().render(response_object)
    return HttpResponse(response_data, content_type='application/json')