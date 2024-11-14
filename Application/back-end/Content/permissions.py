from rest_framework import permissions


class IsOwnerOrReadOnly(permissions.IsAuthenticatedOrReadOnly):
    models_fields = ["author", "user", "channel.author"]

    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS:
            return True

        if request.user and not request.user.is_authenticated:
            return False

        return self.is_owner(obj, request.user)

    def is_owner(self, obj, user):
        field = obj
        for i in self.models_fields:
            for j in i.split('.'):
                next_field = getattr(field, j, None)
                if next_field:
                    field = next_field

        return field == user
