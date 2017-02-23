from rest_framework import permissions


class IsProfileOwnerOrReadOnly(permissions.BasePermission):

    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS:
            return True

        # Instance must have an attribute named `owner`.
        return obj.id == request.user.id


class IsOwnerOrReadOnly(permissions.BasePermission):

    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS:
            return True

        # Instance must have an attribute named `owner`.
        return obj.owner.id == request.user.id


class IsOwnerOrObjectReadOnly(permissions.BasePermission):

    #  def has_permission(self, request, view):
    #      return obj.owner.id == request.user.id

    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS:
            isOwner = obj.owner.id == request.user.id
            isObject = obj.object.id == request.user.id
            return isOwner or isObject

        return obj.owner.id == request.user.id
