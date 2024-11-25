from celery_app import app as celery_app
from django.conf import settings
from django.core.mail import get_connection


@celery_app.task()
def send_messages(email_messages):
    if not email_messages:
        return 0

    conn = get_connection(backend=settings.EMAIL_BACKEND)
    with conn._lock:  # NOQA
        new_conn_created = conn.open()
        if not conn.connection or new_conn_created is None:
            return 0

        num_sent = 0
        for message in email_messages:
            if conn._send(message):  # NOQA
                num_sent += 1

        if new_conn_created:
            conn.close()

    return num_sent
