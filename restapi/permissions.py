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
        print "obj.owner: {}".format(obj.owner)
        print "request.user.id: {}".format(request.user.id)
        return obj.owner.id == request.user.id
