from rest_framework import serializers
from django.utils.translation import pgettext_lazy as _

from .drf_fields import AccessPrimaryKeyRelatedField
from .models import Channel, Video, Hashtag, Rating


class ChannelSerializer(serializers.ModelSerializer):
    author = serializers.HiddenField(default=serializers.CurrentUserDefault())

    class Meta:
        model = Channel
        extra_kwargs = {"is_blocked": {"read_only": True}}
        fields = "__all__"


class VideoSerializer(serializers.ModelSerializer):
    channel = AccessPrimaryKeyRelatedField(model=Channel, filter_condition="author", only=(
        "author", "name"
    ))

    @staticmethod
    def validate_video(data):
        error = serializers.ValidationError(
                _("Upload a valid video. The file you uploaded was either not an video or a corrupted video."))

        try:
            if "video" in data.file.name:
                raise error
        except BaseException:
            raise error
        return data

    class Meta:
        model = Video
        fields = "__all__"


class HashtagSerializer(serializers.ModelSerializer):
    video = AccessPrimaryKeyRelatedField(model=Video, filter_condition="channel__author", only=(
        "title",
    ))

    class Meta:
        model = Hashtag
        fields = "__all__"


class RatingSerializer(serializers.ModelSerializer):
    user = serializers.HiddenField(default=serializers.CurrentUserDefault())

    class Meta:
        model = Rating
        fields = "__all__"
