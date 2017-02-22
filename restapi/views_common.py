# -*- coding: utf-8 -*-
from authentication.models import ExtUser, Resume
from core.models import Rubric, Vacancy, UserRequest, UserResponse, Rent, RentRubric
#  from django.core.exceptions import ObjectDoesNotExist
from django.contrib.auth.models import Group
#  from django.core.serializers import serialize
from django.shortcuts import HttpResponse
from restapi.serializers.serializers import UserSZ, RubricSZ, VacancySZ, UserRequestSZ, UserResponseSZ, ResumeSZ, RentSZ, RentRubricSZ
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
    users_q = ExtUser.objects.all()
    users_sz = UserSZ(users_q, many=True)
    resumes_q = Resume.objects.all()
    resumes_sz = ResumeSZ(resumes_q, many=True)
    # получение остальных данных
    groups_q = Group.objects.all().values('id', 'name')
    #  rubrics_q = Rubric.objects.all().values('id', 'name', 'parent', 'image', 'level', 'tree_id')
    rubrics_q = Rubric.objects.all()
    rubrics_sz = RubricSZ(rubrics_q, many=True)
    vacancies_q = Vacancy.objects.all()
    vacancies_sz = VacancySZ(vacancies_q, many=True)
    rent_rubrics_q = RentRubric.objects.all()
    rent_rubrics_sz = RentRubricSZ(rent_rubrics_q, many=True)
    rents_q = Rent.objects.all()
    rents_sz = RentSZ(rents_q, many=True)
    requests_q = UserRequest.objects.all()
    requests_sz = UserRequestSZ(requests_q, many=True)
    responses_q = UserResponse.objects.all()
    responses_sz = UserResponseSZ(responses_q, many=True)
    response_object = {
        "user": user_data,
        "users": users_sz.data,
        "resumes": resumes_sz.data,
        "groups": list(groups_q),
        "rubrics": rubrics_sz.data,
        "rentRubrics": rent_rubrics_sz.data,
        "vacancies": vacancies_sz.data,
        "rents": rents_sz.data,
        "requests": requests_sz.data,
        "responses": responses_sz.data,
    }
    response_data = JSONRenderer().render(response_object)
    return HttpResponse(response_data, content_type='application/json')
