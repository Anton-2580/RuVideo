from django.contrib import admin

from .models import Channel, Video, Hashtag


@admin.register(Channel)
class ChannelAdmin(admin.ModelAdmin):
    list_display = ("name", "author", "description", "is_blocked")
    list_filter = ("is_blocked", )
    search_fields = ("name", "author", "description")
    

@admin.register(Video)
class VideoAdmin(admin.ModelAdmin):
    list_display = ("title", "chanel", "description")
    search_fields = ("title", "chanel", "description")


@admin.register(Hashtag)
class HashtagAdmin(admin.ModelAdmin):
    list_display = ("hashtag", )
    search_fields = ("hashtag", "video")
