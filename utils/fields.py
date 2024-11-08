from django.db import models
from utils import forms


class VideoField(models.FileField):
    def formfield(self, **kwargs):
        return super().formfield(
            **{
                "form_class": forms.VideoField,
                **kwargs
            }
        )

