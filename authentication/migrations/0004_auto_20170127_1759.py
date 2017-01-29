# -*- coding: utf-8 -*-
# Generated by Django 1.10.4 on 2017-01-27 17:59
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('authentication', '0003_auto_20170124_1639'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='extuser',
            name='date_of_birth',
        ),
        migrations.RemoveField(
            model_name='extuser',
            name='image',
        ),
        migrations.RemoveField(
            model_name='extuser',
            name='middlename',
        ),
        migrations.AlterField(
            model_name='extuser',
            name='ad',
            field=models.TextField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='extuser',
            name='city',
            field=models.CharField(blank=True, max_length=200, null=True),
        ),
        migrations.AlterField(
            model_name='extuser',
            name='edu',
            field=models.TextField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='extuser',
            name='filmography',
            field=models.TextField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='extuser',
            name='languages',
            field=models.TextField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='extuser',
            name='phone',
            field=models.CharField(blank=True, max_length=12, null=True),
        ),
        migrations.AlterField(
            model_name='extuser',
            name='text',
            field=models.TextField(blank=True, null=True),
        ),
    ]
