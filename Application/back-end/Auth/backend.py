from django.core.mail import EmailMessage
from django.core.mail.backends.smtp import EmailBackend
from .tasks import send_messages


class CeleryEmailBackend(EmailBackend):
    def send_messages(self, email_messages: list[EmailMessage]):
        messages = [{
            "to": i.to,
            "from_email": i.from_email,
            "message": i.body,
            "subject": i.subject,
        } for i in email_messages]

        send_messages.delay(messages)
