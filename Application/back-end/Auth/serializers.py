from dj_rest_auth.serializers import UserDetailsSerializer as BaseUserDetailsSerializer
from django.contrib.auth import get_user_model

UserModel = get_user_model()


class UserDetailsSerializer(BaseUserDetailsSerializer):
    class Meta:
        model = UserModel
        extra_fields = (
            UserModel.USERNAME_FIELD,
            UserModel.EMAIL_FIELD,
            "first_name",
            "last_name",
            "photo",
            "likest_format",
        )
        fields = ("pk", *extra_fields)
        read_only_fields = ("email", )
