from rest_framework import viewsets
from restapi.serializers import serializers
from authentication.models import Resume, Company
from core.models import Rubric, Vacancy, UserRequest, UserResponse, Rent, RentRubric
from rooms.models import Room, Message
#  from authentication.models import ExtUser
from restapi import permissions
#  from rest_framework.permissions import AllowAny
from django.contrib.auth import get_user_model
from django.db.models import Q
User = get_user_model()


class UserViewSet(viewsets.ModelViewSet):
    permission_classes = (permissions.IsProfileOwnerOrReadOnly, )
    queryset = User.objects.all()
    serializer_class = serializers.UserSZ

    def get_serializer_class(self):
        serializer_class = self.serializer_class
        if self.request.method == 'PUT' and self.request.user.groups.all().count() != 0:
            serializer_class = serializers.ProtectedUserSZ
        return serializer_class

    #  def get_queryset(self):
    #      try:
    #          user = self.request.user
    #          return ExtUser.objects.filter(id=user.id)
    #      except Exception:
    #          return []


#  class ProfileViewSet(viewsets.ModelViewSet):
#      permission_classes = (permissions.IsOwnerOrReadOnly, )
#      queryset = Profile.objects.all()
#      serializer_class = serializers.ProfileSZ

#      def get_serializer_class(self):
#          serializer_class = self.serializer_class
#          if self.request.method == 'PUT':
#              serializer_class = serializers.ProtectedProfileSZ
#          return serializer_class


class ResumeViewSet(viewsets.ModelViewSet):
    permission_classes = (permissions.IsOwnerOrReadOnly, )
    queryset = Resume.objects.all()
    serializer_class = serializers.ResumeSZ


class CompanyViewSet(viewsets.ModelViewSet):
    permission_classes = (permissions.IsProfileOwnerOrReadOnly, )
    queryset = Company.objects.all()
    serializer_class = serializers.CompanySZ


class RubricViewSet(viewsets.ModelViewSet):
    queryset = Rubric.objects.all()
    serializer_class = serializers.RubricSZ


class RentRubricViewSet(viewsets.ModelViewSet):
    queryset = RentRubric.objects.all()
    serializer_class = serializers.RentRubricSZ


class VacancyViewSet(viewsets.ModelViewSet):
    permission_classes = (permissions.IsOwnerOrReadOnly, )
    #  permission_classes = (AllowAny, )
    queryset = Vacancy.objects.all()
    serializer_class = serializers.VacancySZ


class RentViewSet(viewsets.ModelViewSet):
    permission_classes = (permissions.IsOwnerOrReadOnly, )
    queryset = Rent.objects.all()
    serializer_class = serializers.RentSZ


class UserRequestViewSet(viewsets.ModelViewSet):
    permission_classes = (permissions.IsOwnerOrReadOnly, )
    queryset = UserRequest.objects.all()
    serializer_class = serializers.UserRequestSZ


class UserResponseViewSet(viewsets.ModelViewSet):
    permission_classes = (permissions.IsOwnerOrReadOnly, )
    queryset = UserResponse.objects.all()
    serializer_class = serializers.UserResponseSZ


class MessageViewSet(viewsets.ModelViewSet):
    permission_classes = (permissions.IsOwnerOrObjectReadOnly, )
    queryset = Message.objects.all()
    serializer_class = serializers.MessageSZ

    def get_queryset(self):
        if self.request.user.is_superuser:
            return Message.objects.all()
        else:
            return Message.objects.filter(Q(owner=self.request.user.id) | Q(object=self.request.user.id))


class RoomViewSet(viewsets.ModelViewSet):
    permission_classes = (permissions.IsPostOrMemberSafe, )
    queryset = Room.objects.all()
    serializer_class = serializers.RoomSZ

    def get_queryset(self):
        if self.request.user.is_superuser:
            return Room.objects.all()
        else:
            return Room.objects.filter(Q(user1=self.request.user.id) | Q(user2=self.request.user.id))
