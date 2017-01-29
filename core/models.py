# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from django.db import models
from mptt.models import MPTTModel, TreeForeignKey
#  from django.contrib.auth import get_user_model
#  User = get_user_model()
from authentication.models import ExtUser


class Rubric(MPTTModel):
    name = models.CharField(max_length=200)
    parent = TreeForeignKey('self', related_name='children', blank=True, null=True)
    image = models.ImageField(blank=True, null=True, upload_to="category")

    class Meta:
        verbose_name = u'Рубрика'
        verbose_name_plural = u'Рубрики'

    def __unicode__(self):
        return self.name

    @property
    def url(self):
        return "/rubrics/%s/" % self.id


class Vacancy(models.Model):
    owner = models.ForeignKey(ExtUser)
    name = models.CharField(max_length=200)
    description = models.TextField(blank=True)
    rubrics = models.ManyToManyField(Rubric)

    class Meta:
        verbose_name = u'Вакансия'
        verbose_name_plural = u'Вакансии'

    def __unicode__(self):
        return self.name

    @property
    def url(self):
        return "/vacancies/%s/" % self.id


class UserRequest(models.Model):
    owner = models.ForeignKey(ExtUser, related_name="request_owner")
    vacancy = models.ForeignKey(Vacancy, blank=True, null=True)
    object = models.ForeignKey(ExtUser, related_name="request_object")

    text = models.TextField()

    class Meta:
        verbose_name = u'Запрос пользователя'
        verbose_name_plural = u'Запросы пользователей'
    #  def __unicode__(self):
    #      return self.name


class UserResponse(models.Model):
    owner = models.ForeignKey(ExtUser)
    userRequest = models.ForeignKey(UserRequest)
    status = models.BooleanField(default=False)

    text = models.TextField()

    class Meta:
        verbose_name = u'Ответ пользователя'
        verbose_name_plural = u'Ответы пользователей'
