from django.forms import FileField


class VideoField(FileField):
    def widget_attrs(self, widget):
        attrs = super().widget_attrs(widget)
        attrs.setdefault("accept", "video/*")

        return attrs
