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

    resolutions = (
        "256x144",
        "426x240",
        "640x360",
        "852x480",
        "1280x720",
        "1920x1080",
    )
    s_v = []
    for index, i in enumerate(resolutions):
        s_v.append(f"-s:v:{index}")
        s_v.append(i)

    maps = ["-map", "0"]
    for _ in range(len(resolutions) - 1):
        maps.append("-map")
        maps.append("0:0")

    subprocess.run(["mkdir", f"{path}/mpd",             f"{path}/m3u8",             f"{path}/rewind_frames"], stdout=subprocess.DEVNULL)
    subprocess.run(["mkdir", f"{path}/mpd/{file_name}", f"{path}/m3u8/{file_name}", f"{path}/rewind_frames/{file_name}"], stdout=subprocess.DEVNULL)

    subprocess.run(["ffmpeg", "-i", video_path,
                    "-s:v", "256:144", "-vf", "fps=1",
                    f"{path}/rewind_frames/{file_name}/%01d.png"
    ], stdout=subprocess.DEVNULL)

    # subprocess.run(["ffmpeg", "-i", video_path, *resolutions, f"{path}/m3u8/{file_name}/{file_name}.m3u8"], stdout=subprocess.DEVNULL)
    subprocess.run(["ffmpeg", "-i", video_path, *s_v, *maps,
                    "-use_timeline", "1",
                    "-use_template", "1",
                    "-adaptation_sets", "id=0,streams=v id=1,streams=a",
                    f"{path}/mpd/{file_name}/{file_name}.mpd"
    ], stdout=subprocess.DEVNULL)
