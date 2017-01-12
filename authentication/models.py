from __future__ import unicode_literals
from django.db import models
from django.contrib.auth.models import User


class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    lastname = models.CharField(max_length=200)
    firstname = models.CharField(max_length=200)
    is_worker = models.BooleanField(default=True)
    city = models.CharField(max_length=200)
    phone = models.CharField(max_length=12)
    edu = models.TextField()
    filmography = models.TextField()
    ad = models.TextField()
    languages = models.TextField()

    class Meta:
        app_label = 'auth'

    def __unicode__(self):
        return "Profile - %s" % self.user

