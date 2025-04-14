from rest_framework import viewsets, mixins
from rest_framework.viewsets import GenericViewSet
from rest_framework.permissions import IsAuthenticated

from .permissions import IsOwnerOrReadOnly, IsOwner

from .models import Channel, Video, Comment, Hashtag, Rating, Subscribe, Notification
from .serializers import (ChannelSerializer, VideoSerializer, VideoWithChannelsSerializer,
                          VideoDetailWithChannelsSerializer, CommentSerializer,
                          HashtagSerializer, RatingSerializer, SubscribeSerializer, NotificationSerializer)


class ChannelViewSet(viewsets.ModelViewSet):
    queryset = Channel.objects.all()
    serializer_class = ChannelSerializer
    permission_classes = (IsOwnerOrReadOnly, )


class VideoViewSet(viewsets.ModelViewSet):
    queryset = Video.objects.all()
    serializer_class = VideoSerializer
    permission_classes = (IsOwnerOrReadOnly,)

class VideoWithChannelsViewSet(viewsets.ModelViewSet):
    queryset = Video.objects.all()
    serializer_class = VideoWithChannelsSerializer
    permission_classes = (IsOwnerOrReadOnly,)

    lookup_field = "slug"

    def get_serializer_class(self, *args, **kwargs):
        if self.action == "retrieve":
            return VideoDetailWithChannelsSerializer

        return self.serializer_class


class CommentViewSet(viewsets.ModelViewSet):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
    pagination_class = (IsOwnerOrReadOnly, )


class HashtagViewSet(viewsets.ModelViewSet):
    queryset = Hashtag.objects.all()
    serializer_class = HashtagSerializer
    permission_classes = (IsOwnerOrReadOnly,)


class RatingViewSet(viewsets.ModelViewSet):
    queryset = Rating.objects.all()
    serializer_class = RatingSerializer
    permission_classes = (IsAuthenticated,)


class SubscribeViewSet(viewsets.ModelViewSet):
    queryset = Subscribe.objects.all()
    serializer_class = SubscribeSerializer
    permission_classes = (IsAuthenticated,)


class NotificationViewSet(mixins.RetrieveModelMixin,
                          mixins.UpdateModelMixin,
                          mixins.ListModelMixin,
                          GenericViewSet):
    queryset = Notification.objects.all()
    serializer_class = NotificationSerializer
    permission_classes = (IsOwner,)
