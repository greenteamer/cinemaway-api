# -*- coding: utf-8 -*-
from authentication.models import Profile
from django.core.exceptions import ObjectDoesNotExist
from django.shortcuts import HttpResponse
from restapi.serializers.serializers import UserSZ, ProfileSZ
from rest_framework.renderers import JSONRenderer


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
