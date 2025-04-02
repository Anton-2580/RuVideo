import subprocess
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


@shared_task
def create_video_files(video_path):
    path, file_name = video_path.rsplit("/", maxsplit=1)  # [".../original", "file_name.mp4"]
    path = path.rsplit("/", maxsplit=1)[0]
    file_name = file_name.rsplit(".", maxsplit=1)[0]

    subprocess.run(["mkdir", f"{path}/mpd", f"{path}/m3u8"], stdout=subprocess.DEVNULL)
    subprocess.run(["mkdir", f"{path}/mpd/{file_name}", f"{path}/m3u8/{file_name}"], stdout=subprocess.DEVNULL)

    subprocess.run(["ffmpeg", "-i", video_path, f"{path}/mpd/{file_name}/{file_name}.mpd"], stdout=subprocess.DEVNULL)
    subprocess.run(["ffmpeg", "-i", video_path, f"{path}/m3u8/{file_name}/{file_name}.m3u8"], stdout=subprocess.DEVNULL)
