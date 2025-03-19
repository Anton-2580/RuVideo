from celery import shared_task
from django.conf import settings
from django.core.mail import get_connection, EmailMessage


@shared_task
def send_messages(messages: list[dict]):
    connection = get_connection(settings.EMAIL_BACKEND_USED_BY_CELERY)

    email_messages = [
        EmailMessage(i["subject"], i["message"], i["from_email"], i["to"], connection=connection)
        for i in messages
    ]
    connection.send_messages(email_messages)
