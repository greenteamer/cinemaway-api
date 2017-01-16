from rest_framework import viewsets
from restapi.serializers import serializers
from authentication.models import Profile
from django.contrib.auth.models import User
from restapi import permissions

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
    permission_classes = (permissions.IsOwnerOrReadOnly, )
    queryset = Profile.objects.all()
    serializer_class = serializers.ProfileSZ

    def get_serializer_class(self):
        serializer_class = self.serializer_class
        if self.request.method == 'PUT':
            serializer_class = serializers.ProtectedProfileSZ
        return serializer_class
