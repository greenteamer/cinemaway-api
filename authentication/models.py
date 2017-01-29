# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from django.db import models
#  from core.models import Rubric
from django.contrib.auth.models import AbstractBaseUser
from django.contrib.auth.models import BaseUserManager
from django.contrib.auth.models import PermissionsMixin
# from django.contrib.auth import get_user_model
# User = get_user_model()


class UserManager(BaseUserManager):

    def create_user(self, email, password=None):
        if not email:
            raise ValueError('Email is required.')

        user = self.model(email=UserManager.normalize_email(email))
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password):
        user = self.create_user(email, password)
        user.is_admin = True
        user.save(using=self._db)
        return user


class ExtUser(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField('Email', max_length=255, unique=True, db_index=True)
    avatar = models.ImageField('Avatar image', blank=True, null=True, upload_to="user/avatar")
    firstname = models.CharField(
        'First name',
        max_length=40,
        null=True,
        blank=True
    )
    lastname = models.CharField(
        'Last name',
        max_length=40,
        null=True,
        blank=True
    )
    register_date = models.DateField(
        'Registration date',
        auto_now_add=True
    )
    is_active = models.BooleanField(
        'Active',  # Not blocked, banned, etc
        default=True
    )
    is_admin = models.BooleanField(
        'Is superuser',
        default=False
    )

    city = models.CharField(max_length=200, blank=True, null=True)
    phone = models.CharField(max_length=12, blank=True, null=True)
    edu = models.TextField(blank=True, null=True)
    filmography = models.TextField(blank=True, null=True)
    ad = models.TextField(blank=True, null=True)
    languages = models.TextField(blank=True, null=True)
    text = models.TextField(blank=True, null=True)
    rubrics = models.ManyToManyField('core.Rubric')

    # Django require define this method
    def get_full_name(self):
        return self.email

    @property
    def is_staff(self):
        # Required Django for admin panel
        return self.is_admin

    def get_short_name(self):
        u"""Return short name."""
        return self.email

    def __str__(self):
        u"""String representation of model. Email by default."""
        return self.email

    # Field, used as 'username' in authentication and orher forms
    USERNAME_FIELD = 'email'

    """
    Username required by default. Add here another fields, where
    must be defined for correct model creation.
    """
    REQUIRED_FIELDS = []

    # Link model and model manager
    objects = UserManager()

    class Meta:
        verbose_name = 'user'
        verbose_name_plural = 'users'
        # db_table = 'extuser'


#  class Profile(models.Model):
#      owner = models.OneToOneField(ExtUser, on_delete=models.CASCADE)
#      lastname = models.CharField(max_length=200, blank=True)
#      firstname = models.CharField(max_length=200, blank=True)
#      city = models.CharField(max_length=200, blank=True)
#      phone = models.CharField(max_length=12, blank=True)
#      edu = models.TextField(blank=True)
#      filmography = models.TextField(blank=True)
#      ad = models.TextField(blank=True)
#      languages = models.TextField(blank=True)
#      text = models.TextField(blank=True)
#      image = models.ImageField(blank=True, null=True, upload_to="profile")
#      rubrics = models.ManyToManyField(Rubric)

#      isWorker = models.BooleanField(default=True)
#      isSaved = models.BooleanField(default=False)

#      class Meta:
#          verbose_name = 'Профиль'
#          verbose_name_plural = 'Профили'

#      def __unicode__(self):
#          return "Profile - %s" % self.owner

#      def save(self, *args, **kwargs):
#          self.isSaved = True
#          super(Profile, self).save(*args, **kwargs)
