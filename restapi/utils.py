from django.core import serializers
from restapi.serializers import serializers
from django.contrib.auth.models import User
from authentication.models import Profile
import json


def serialize_data(*args):
    user_serializer = serializers.UserSZ(User.objects.all())
    profile_serializer = serializers.ProfileSZ(Profile.objects.all())
    querry_dict = {}
    for queryset in args:
        model_name = queryset.model.__name__
        querry_dict[model_name] = list(queryset)
        # s_data = serializers.serialize("json", queryset, fields=get_fields(model_name))
    s_data = serializers.serialize("json", querry_dict)
    return s_data



def get_fields(model_name):
    return {
        "user": ('username', 'email'),
        "profile": ('user', 'lastname', 'firstname'),
    }

