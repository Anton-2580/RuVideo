from rest_framework import serializers
from django.db.models import Q
from django.utils.translation import pgettext_lazy as _

from .drf_fields import AccessPrimaryKeyRelatedField
from .models import Channel, Video, Hashtag, Rating, Subscribe, Notification, Comment


class ChannelSerializer(serializers.ModelSerializer):
    author = serializers.HiddenField(default=serializers.CurrentUserDefault())

    class Meta:
        model = Channel
        extra_kwargs = {
            "is_blocked": {"read_only": True},
            "subscribers": {"read_only": True},
        }
        fields = "__all__"


class VideoSerializer(serializers.ModelSerializer):
    channel = AccessPrimaryKeyRelatedField(model=Channel, filter_condition="author", only=(
        "author", "name"
    ))

    def to_representation(self, instance: Video):
        res = super().to_representation(instance)
        res["dataTime"] = instance.dataTime.timestamp()
        return res

    @staticmethod
    def add_formats(res: dict):
        path = res["video"].rsplit("original", maxsplit=1)
        filename = path[1].rsplit(".", maxsplit=1)[0]

        res["mpd"] = f"{path[0]}/mpd/{filename}/{filename}.mpd"
        res["m3u8"] = f"{path[0]}/m3u8/{filename}/{filename}.m3u8"
        res["rewind_frames"] = f"{path[0]}/rewind_frames/{filename}/%01d.png"

    @staticmethod
    def validate_video(data):
        error = serializers.ValidationError(
            _("Upload a valid video. The file you uploaded was either not an video or a corrupted video."),
        )

        try:
            if "video" in data.file.name:
                raise error
        except BaseException:
            raise error
        return data

    class Meta:
        model = Video
        fields = "__all__"
        extra_kwargs = {
            "browsing": {"read_only": True},
        }


class VideoWithChannelsSerializer(VideoSerializer):
    channel = ChannelSerializer(read_only=True)

class VideoDetailWithChannelsSerializer(VideoWithChannelsSerializer):
    def to_representation(self, instance: Video):
        res = super().to_representation(instance)

        self.add_formats(res)
        return res


class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
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


class SubscribeSerializer(serializers.ModelSerializer):
    user = serializers.HiddenField(default=serializers.CurrentUserDefault())
    channel = AccessPrimaryKeyRelatedField(model=Channel, filter_condition=lambda user: ~Q(author=user), only=(
            "name",
        ))

    class Meta:
        model = Subscribe
        fields = "__all__"


class NotificationSerializer(serializers.ModelSerializer):
    user = serializers.HiddenField(default=serializers.CurrentUserDefault())

    class Meta:
        model = Notification
        extra_kwargs = {"message": {"read_only": True}}
        fields = "__all__"
