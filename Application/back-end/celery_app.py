import os

from django.conf import settings
from celery import Celery


os.environ.setdefault("DJANGO_SETTINGS_MODULE", "RuVideo.settings")

app = Celery("django_celery")
app.config_from_object("django.conf:settings")
app.conf.broker_url = settings.CELERY_BROKER_URL
app.autodiscover_tasks()
