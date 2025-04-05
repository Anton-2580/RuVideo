from django.core.mail import EmailMessage, EmailMultiAlternatives
from django.core.mail.backends.smtp import EmailBackend
from .tasks import send_messages


class CeleryEmailBackend(EmailBackend):
    def send_messages(self, email_messages: list[EmailMessage]):
        def get_message(message: EmailMultiAlternatives | EmailMessage):
            alternatives = getattr(message, "alternatives", None)
            if not alternatives: return

            for i in alternatives:
                if i[1] == "text/html":
                    return i[0]

            return message.body

        messages = [{
            "to": i.to,
            "from_email": i.from_email,
            "message": get_message(i),  # can be list(EmailMultiAlternatives)
            "subject": i.subject,
        } for i in email_messages]

        send_messages.delay(messages)
