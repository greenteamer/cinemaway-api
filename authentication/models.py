# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from django.db import models
from django.contrib.auth.models import User


class Profile(models.Model):
    owner = models.OneToOneField(User, on_delete=models.CASCADE)
    lastname = models.CharField(max_length=200, blank=True)
    firstname = models.CharField(max_length=200, blank=True)
    city = models.CharField(max_length=200, blank=True)
    phone = models.CharField(max_length=12, blank=True)
    edu = models.TextField(blank=True)
    filmography = models.TextField(blank=True)
    ad = models.TextField(blank=True)
    languages = models.TextField(blank=True)
    text = models.TextField(blank=True)

    isWorker = models.BooleanField(default=True)
    isSaved = models.BooleanField(default=False)

    class Meta:
        verbose_name = 'Профиль'
        verbose_name_plural = 'Профили'

    def __unicode__(self):
        return "Profile - %s" % self.owner

    def save(self, *args, **kwargs):
        self.isSaved = True
        super(Profile, self).save(*args, **kwargs)
