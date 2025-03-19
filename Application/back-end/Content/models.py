from django.db import models

from django.core.exceptions import ValidationError
from django.contrib.auth import get_user_model
from utils.fields import VideoField

from .tasks import send_notification


class Channel(models.Model):
    author = models.ForeignKey(get_user_model(), on_delete=models.PROTECT, verbose_name="автор")
    name = models.CharField(unique=True, max_length=25, verbose_name="название")
    description = models.TextField(null=True, blank=True, verbose_name="описание")
    photo = models.ImageField(null=True, blank=True, upload_to="photos/%Y/%m/%d/", verbose_name="аватарка")
    is_blocked = models.BooleanField(default=False, verbose_name="блокировка")
    subscribers = models.PositiveIntegerField(default=0, verbose_name="количество подписчиков")

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = "Канала"
        verbose_name_plural = "Каналы"


class Video(models.Model):
    video = VideoField(verbose_name="видео")
    dataTime = models.DateTimeField(auto_now=True, verbose_name="дата загрузки")
    photo = models.ImageField(upload_to="photos/%Y/%m/%d/", null=True, blank=True, verbose_name="превью")
    title = models.CharField(max_length=255, verbose_name="заголовок")
    description = models.TextField(null=True, blank=True, verbose_name="описание")
    channel = models.ForeignKey(Channel, on_delete=models.PROTECT, verbose_name="канал")
    is_published = models.BooleanField(default=True, verbose_name="публикация")

    def __str__(self):
        return self.title
    
    class Meta:
        verbose_name = "Видео"
        verbose_name_plural = "Видео"
    
    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)

        send_notification.delay(f"На канале новое видео", "Content.Subscribe", {"channel": self.channel.pk})


class Comment(models.Model):
    author = models.ForeignKey(get_user_model(), on_delete=models.CASCADE, verbose_name="автор")
    text = models.TextField(max_length=255, verbose_name="текст")
    created = models.DateTimeField(auto_now=True, verbose_name="время добавления")
    is_parent = models.BooleanField(default=False, verbose_name="является ли комеентарием 1 уровня")
    answer = models.ForeignKey("Comment", on_delete=models.CASCADE, null=True, blank=True)
    notify = models.BooleanField(default=True)

    def __str__(self):
        return self.text

    def validate_constraints(self, exclude=None):
        super().validate_constraints(exclude)
        self.answer: Comment | None

        if self.is_parent and self.answer:
            raise ValidationError("комеентарий 1 уровня не может быть ответом")

        if not (self.answer or self.is_parent):
            raise ValidationError("комеентарий должен быть либо 1 уровня либо ответом")

        if self.answer and not self.answer.is_parent:
            raise ValidationError("нельзя отвечать на ответ")

    def save(self, *args, **kwargs):
        super().save()
        self.answer: Comment | None

        if self.answer and self.author != self.answer.author:
            send_notification.delay("На ваш комментарий ответили", "Content.Comment", {"pk": self.answer.pk}, "author")

    class Meta:
        verbose_name = "Комментария"
        verbose_name_plural = "Комментарии"


class Hashtag(models.Model):
    hashtag = models.CharField(max_length=30)
    video = models.ForeignKey(Video, on_delete=models.CASCADE)

    class Meta:
        unique_together = ("hashtag", "video")
        verbose_name = "хэштег"
        verbose_name_plural = "хэштеги"


class Rating(models.Model):
    user = models.ForeignKey(get_user_model(), on_delete=models.CASCADE)
    is_like = models.BooleanField()
    video = models.ForeignKey(Video, on_delete=models.CASCADE)

    class Meta:
        unique_together = ["user", "video"]


class Subscribe(models.Model):
    user = models.ForeignKey(get_user_model(), on_delete=models.CASCADE)
    channel = models.ForeignKey(Channel, on_delete=models.CASCADE)
    notify = models.BooleanField(default=False)

    class Meta:
        unique_together = ["user", "channel"]


class Notification(models.Model):
    is_read = models.BooleanField(default=False)
    message = models.TextField()
    datatime = models.DateTimeField(auto_now_add=True)
    user = models.ForeignKey(get_user_model(), on_delete=models.CASCADE)
