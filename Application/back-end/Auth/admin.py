from django.contrib import admin
from allauth.account.decorators import secure_admin_login
from django.utils.safestring import mark_safe

from django.contrib.auth import get_user_model
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin


@admin.register(get_user_model())
class UserAdmin(BaseUserAdmin):
    list_display = (*BaseUserAdmin.list_display, "get_photo")

    def get_photo(self, obj):
        if obj.photo:
            return mark_safe(f'<img src="{obj.photo.url}" width=150>')

    get_photo.short_description = "аватарка"


admin.site.site_header = "Администрирование RuVideo"
admin.site.site_title = "Администрирование RuVideo"
admin.site.index_title = "Администрирование RuVideo"

admin.autodiscover()
admin.site.login = secure_admin_login(admin.site.login)
