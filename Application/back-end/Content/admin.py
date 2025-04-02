from django.contrib import admin

from .models import Channel, Video, Hashtag, Comment


@admin.register(Channel)
class ChannelAdmin(admin.ModelAdmin):
    exclude = ("subscribers", )
    list_display = ("name", "author", "description", "is_blocked")
    list_filter = ("is_blocked", )
    search_fields = ("name", "author", "description")
    

@admin.register(Video)
class VideoAdmin(admin.ModelAdmin):
    exclude = ("browsing", )
    prepopulated_fields = {"slug": ("channel", "title")}
    list_display = ("title", "channel", "description", "browsing")
    search_fields = ("title", "channel", "description")


@admin.register(Comment)
class CommentAdmin(admin.ModelAdmin):
    list_display = ("text", "created")
    search_fields = ("text", "created", "parent")


@admin.register(Hashtag)
class HashtagAdmin(admin.ModelAdmin):
    list_display = ("hashtag", )
    search_fields = ("hashtag", "video")
