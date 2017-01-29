# -*- coding: utf-8 -*-
#  from authentication.models import Profile
from core.models import Rubric, Vacancy
#  from django.core.exceptions import ObjectDoesNotExist
from django.contrib.auth.models import Group
#  from django.core.serializers import serialize
from django.shortcuts import HttpResponse
from restapi.serializers.serializers import UserSZ, RubricSZ, VacancySZ
from rest_framework.renderers import JSONRenderer
#  from django.core.serializers.json import DjangoJSONEncoder
#  import json


def all_data(request):
    # сериализуем пользователя
    response_object = {}
    if request.user.is_authenticated:
        s_user = UserSZ(request.user, context={"request": request})
        user_data = s_user.data
    else:
        user_data = None
    # получение остальных данных
    groups_q = Group.objects.all().values('id', 'name')
    #  rubrics_q = Rubric.objects.all().values('id', 'name', 'parent', 'image', 'level', 'tree_id')
    rubrics_q = Rubric.objects.all()
    rubrics_sz = RubricSZ(rubrics_q, many=True)
    vacancies_q = Vacancy.objects.all()
    vacancies_sz = VacancySZ(vacancies_q, many=True)
    response_object = {
        "user": user_data,
        "groups": list(groups_q),
        "rubrics": rubrics_sz.data,
        "vacancies": vacancies_sz.data,
    }
    response_data = JSONRenderer().render(response_object)
    return HttpResponse(response_data, content_type='application/json')
