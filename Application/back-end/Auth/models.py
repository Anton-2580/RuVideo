from django.db import models
from django.contrib.auth.models import AbstractUser, Group


class User(AbstractUser):
    photo = models.ImageField(null=True, blank=True, upload_to="photos/%Y/%m/%d/.", verbose_name="аватарка")
    likest_format = models.CharField(max_length=8, null=True, blank=True)
    play_auto_next = models.BooleanField(default=True)

    class Meta:
        verbose_name = "пользователя"
        verbose_name_plural = "пользователи"


Group._meta.verbose_name = "группу"  # NOQA
