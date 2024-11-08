from django.db import models

from django.contrib.auth import get_user_model
from utils.fields import VideoField


class Channel(models.Model):
    author = models.ForeignKey(get_user_model(), on_delete=models.PROTECT, verbose_name="автор")
    name = models.CharField(max_length=25, verbose_name="название")
    description = models.TextField(null=True, blank=True, verbose_name="описание")
    photo = models.ImageField(null=True, blank=True, upload_to="photos/%Y/%m/%d/", verbose_name="аватарка")
    is_blocked = models.BooleanField(default=False, verbose_name="блокировка")

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = "Канала"
        verbose_name_plural = "Каналы"


class Video(models.Model):
    video = VideoField(verbose_name="видео")
    photo = models.ImageField(upload_to="photos/%Y/%m/%d/", null=True, blank=True, verbose_name="")
    title = models.CharField(max_length=255, verbose_name="заголовок")
    description = models.TextField(null=True, blank=True, verbose_name="описание ")
    chanel = models.ForeignKey(Channel, on_delete=models.PROTECT, verbose_name="канал")
    
    class Meta:
        verbose_name = "Видео"
        verbose_name_plural = "Видео"
    

class Hashtag(models.Model):
    hashtag = models.CharField(max_length=30)
    video = models.ManyToManyField(Video)

    class Meta:
        verbose_name = "хэштег"
        verbose_name_plural = "хэштеги"


class Rating(models.Model):
    is_like = models.BooleanField()
    video = models.ForeignKey(Video, on_delete=models.CASCADE)
