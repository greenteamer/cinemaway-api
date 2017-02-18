# coding: utf8
from rest_framework import serializers
from authentication.models import Resume, Company
# from django.contrib.auth.models import User
from core.models import Rubric, Vacancy, UserRequest, UserResponse, Rent
from django.contrib.auth import get_user_model
User = get_user_model()


class UserSZ(serializers.ModelSerializer):
    # user = User.objects.all()
    class Meta:
        avatar = serializers.ImageField(use_url=True, allow_empty_file=True)
        model = User
        exclude = (
            'password',
            'is_superuser',
            'is_admin',
            'user_permissions'
        )


class ProtectedUserSZ(serializers.ModelSerializer):

    class Meta:
        model = User
        exclude = (
            'password',
            'is_superuser',
            'is_admin',
            'is_active',
            'user_permissions',
            'id',
            'groups'
        )


class ResumeSZ(serializers.ModelSerializer):
    class Meta:
        model = Resume
        fields = '__all__'

class CompanySZ(serializers.ModelSerializer):
    class Meta:
        model = Company
        fields = '__all__'


class RubricSZ(serializers.ModelSerializer):
    url = serializers.CharField(read_only=True)

    class Meta:
        model = Rubric
        fields = ('url', 'id', 'name', 'parent', 'image', 'level', 'tree_id')


class VacancySZ(serializers.ModelSerializer):
    url = serializers.CharField(read_only=True)

    class Meta:
        model = Vacancy
        fields = ('url', 'id', 'name', 'owner', 'description', 'rubrics', 'price')


class RentSZ(serializers.ModelSerializer):
    url = serializers.CharField(read_only=True)

    class Meta:
        model = Rent
        fields = ('url', 'id', 'name', 'owner', 'description', 'image', 'price')


class UserRequestSZ(serializers.ModelSerializer):
    #  vacancy = serializers.PrimaryKeyRelatedField(read_only=True)
    #  rent = serializers.PrimaryKeyRelatedField(read_only=True)

    class Meta:
        model = UserRequest
        fields = ('id', 'owner', 'vacancy', 'rent', 'object', 'text')


class UserResponseSZ(serializers.ModelSerializer):

    class Meta:
        model = UserResponse
        fields = ('id', 'owner', 'userRequest', 'status', 'text')
