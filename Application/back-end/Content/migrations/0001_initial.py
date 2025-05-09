# Generated by Django 5.1.7 on 2025-04-14 18:39

import django.db.models.deletion
import utils.fields
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Channel',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(db_index=True, max_length=25, unique=True, verbose_name='название')),
                ('description', models.TextField(blank=True, null=True, verbose_name='описание')),
                ('photo', models.ImageField(blank=True, null=True, upload_to='photos/%Y/%m/%d/', verbose_name='аватарка')),
                ('is_blocked', models.BooleanField(default=False, verbose_name='блокировка')),
                ('subscribers', models.PositiveIntegerField(default=0, verbose_name='количество подписчиков')),
                ('author', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to=settings.AUTH_USER_MODEL, verbose_name='автор')),
            ],
            options={
                'verbose_name': 'Канала',
                'verbose_name_plural': 'Каналы',
            },
        ),
        migrations.CreateModel(
            name='Comment',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('text', models.TextField(max_length=255, verbose_name='текст')),
                ('created', models.DateTimeField(auto_now=True, verbose_name='время добавления')),
                ('is_parent', models.BooleanField(default=False, verbose_name='является ли комеентарием 1 уровня')),
                ('notify', models.BooleanField(default=True)),
                ('answer', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='Content.comment')),
                ('author', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL, verbose_name='автор')),
            ],
            options={
                'verbose_name': 'Комментария',
                'verbose_name_plural': 'Комментарии',
            },
        ),
        migrations.CreateModel(
            name='Notification',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('is_read', models.BooleanField(default=False)),
                ('message', models.TextField()),
                ('datatime', models.DateTimeField(auto_now_add=True)),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Video',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('video', utils.fields.VideoField(upload_to='video/%Y/%m/%d/original', verbose_name='видео')),
                ('dataTime', models.DateTimeField(auto_now=True, verbose_name='дата загрузки')),
                ('photo', models.ImageField(blank=True, null=True, upload_to='photos/%Y/%m/%d/', verbose_name='превью')),
                ('title', models.CharField(max_length=255, verbose_name='заголовок')),
                ('description', models.TextField(blank=True, null=True, verbose_name='описание')),
                ('is_published', models.BooleanField(default=True, verbose_name='публикация')),
                ('browsing', models.PositiveIntegerField(default=0, verbose_name='просмотры')),
                ('slug', models.SlugField(unique=True, verbose_name='slug')),
                ('channel', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to='Content.channel', verbose_name='канал')),
            ],
            options={
                'verbose_name': 'Видео',
                'verbose_name_plural': 'Видео',
            },
        ),
        migrations.CreateModel(
            name='Subscribe',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('notify', models.BooleanField(default=False)),
                ('channel', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='Content.channel')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'unique_together': {('user', 'channel')},
            },
        ),
        migrations.CreateModel(
            name='Rating',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('is_like', models.BooleanField()),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
                ('video', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='Content.video')),
            ],
            options={
                'unique_together': {('user', 'video')},
            },
        ),
        migrations.CreateModel(
            name='Hashtag',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('hashtag', models.CharField(max_length=30)),
                ('video', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='Content.video')),
            ],
            options={
                'verbose_name': 'хэштег',
                'verbose_name_plural': 'хэштеги',
                'unique_together': {('hashtag', 'video')},
            },
        ),
    ]
