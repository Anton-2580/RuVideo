from django.core.mail.backends.smtp import EmailBackend
from .tasks import send_messages


class CeleryEmailBackend(EmailBackend):
    def send_messages(self, email_messages):
        if not email_messages:
            return 0

        send_messages.delay(email_messages)
        return len(email_messages)
