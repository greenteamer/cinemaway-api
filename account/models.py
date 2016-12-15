from __future__ import unicode_literals
from django.db import models
from django.contrib.auth.models import User


class Worker(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)

    def __unicode__(self):
        return "Worker - %s" % self.user


class Employer(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)

    def __unicode__(self):
        return "Employer - %s" % self.user
