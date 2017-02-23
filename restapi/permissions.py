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

    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS:
            isOwner = obj.owner.id == request.user.id
            isObject = obj.object.id == request.user.id
            return isOwner or isObject

        return obj.owner.id == request.user.id


class IsPostOrMemberSafe(permissions.BasePermission):

    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS:
            isUser1 = obj.user1 == request.user.id
            isUser2 = obj.user2 == request.user.id
            return isUser1 or isUser2
            #  return True

        if request.method == 'POST':
            return True
