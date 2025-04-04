"""
URL configuration for RuVideo project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.conf import settings
from django.contrib import admin
from django.urls import path, include
from rest_framework import routers


from dj_rest_auth.views import PasswordResetConfirmView
from Content.views import *


router = routers.SimpleRouter()
router.register("Channel", ChannelViewSet)
router.register("Video", VideoViewSet)
router.register("VideoWithChannels", VideoWithChannelsViewSet, basename="video_with_channels")
router.register("Comment", CommentViewSet)
router.register("Hashtag", HashtagViewSet)
router.register("Rating", RatingViewSet)
router.register("Subscribe", SubscribeViewSet)
router.register("Notification", NotificationViewSet)

urlpatterns = [
    path("api/", include(router.urls)),

    path("api/auth/", include("dj_rest_auth.urls")),
    path("api/auth/password/reset/confirm/<uidb64>/<token>/", PasswordResetConfirmView.as_view(), name='password_reset_confirm'),
    path("api/registration/", include("dj_rest_auth.registration.urls")),

    path('admin/', admin.site.urls),
]

if settings.DEBUG:
    import debug_toolbar

    urlpatterns += [
        path("__debug__/", include(debug_toolbar.urls)),
    ]
