from celery import shared_task
from importlib import import_module


@shared_task
def send_notification(message: str, model: str, filter_kwargs, user_field_name="user"):
    from Content.models import Notification

    module, class_name = model.rsplit(".", maxsplit=1)
    class_model = getattr(import_module(module).models, class_name)

    for i in class_model.objects.filter(**filter_kwargs, notify=True).only(user_field_name):
        Notification.objects.create(
            message=message,
            user=getattr(i, user_field_name),
        )
