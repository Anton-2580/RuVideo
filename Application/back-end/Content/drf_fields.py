from rest_framework import serializers
from typing import Callable


class AccessPrimaryKeyRelatedField(serializers.PrimaryKeyRelatedField):
    def __init__(self, **kwargs):
        self.model = kwargs.pop("model", None)
        self.filter_condition = kwargs.pop("filter_condition", None)
        self.only = kwargs.pop("only", None)

        super().__init__(**kwargs)

    def get_queryset(self):
        queryset = super().get_queryset()
        current_user = self.context.get("request", None).user

        if None not in (self.model, self.filter_condition, current_user):
            if isinstance(self.filter_condition, Callable):
                queryset = self.model.objects.filter(self.filter_condition(current_user))
            else:
                queryset = self.model.objects.filter(**{self.filter_condition: current_user})

        if self.only:
            queryset = queryset.only(*self.only)

        return queryset
