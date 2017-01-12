# coding: utf8
from rest_framework import serializers
from authentication.models import Profile
from django.contrib.auth.models import User


class UserSZ(serializers.ModelSerializer):
    # user = User.objects.all()
    class Meta:
        model = User
        fields = ('url', 'id', 'username', 'email')


class ProfileSZ(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = ('url', 'id', 'user', 'firstname', 'lastname')
