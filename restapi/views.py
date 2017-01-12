from rest_framework import viewsets
from restapi.serializers import serializers
from authentication.models import Profile
from django.contrib.auth.models import User


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = serializers.UserSZ

    def get_queryset(self):
        try:
            user = self.request.user
            return User.objects.filter(id=user.id)
        except Exception:
            return []


class ProfileViewSet(viewsets.ModelViewSet):
    queryset = Profile.objects.all()
    serializer_class = serializers.ProfileSZ
