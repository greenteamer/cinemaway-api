# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from django.db import models
from mptt.models import MPTTModel, TreeForeignKey
#  from django.contrib.auth import get_user_model
#  User = get_user_model()
from authentication.models import ExtUser
from django.core.exceptions import ValidationError


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


class RentRubric(MPTTModel):
    name = models.CharField(max_length=200)
    parent = TreeForeignKey('self', related_name='children', blank=True, null=True)
    image = models.ImageField(blank=True, null=True, upload_to="category")

    class Meta:
        verbose_name = u'Рубрика аренды'
        verbose_name_plural = u'Рубрики аренды'

    def __unicode__(self):
        return self.name

    @property
    def url(self):
        return "/rent-rubrics/%s/" % self.id


class Vacancy(models.Model):
    owner = models.ForeignKey(ExtUser)
    name = models.CharField(max_length=200)
    description = models.TextField(blank=True)
    rubrics = models.ManyToManyField(Rubric, blank=True, null=True)
    price = models.CharField(max_length=200, blank=True)

    class Meta:
        verbose_name = u'Вакансия'
        verbose_name_plural = u'Вакансии'

    def __unicode__(self):
        return self.name

    @property
    def url(self):
        return "/vacancies/%s/" % self.id


class Rent(models.Model):
    owner = models.ForeignKey(ExtUser)
    name = models.CharField(max_length=200)
    rentRubrics = models.ManyToManyField(RentRubric, blank=True, null=True)
    description = models.TextField(blank=True)
    price = models.CharField(max_length=200, blank=True)
    image = models.ImageField(blank=True, null=True, upload_to="rent")

    class Meta:
        verbose_name = u'Аренда'
        verbose_name_plural = u'Список аренды'

    def __unicode__(self):
        return self.name

    @property
    def url(self):
        return "/rents/%s/" % self.id


class UserRequest(models.Model):
    owner = models.ForeignKey(ExtUser, related_name="request_owner")
    vacancy = models.ForeignKey(Vacancy, null=True)
    rent = models.ForeignKey(Rent, null=True)
    object = models.ForeignKey(ExtUser, related_name="request_object")

    text = models.TextField()

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = u'Запрос пользователя'
        verbose_name_plural = u'Запросы пользователей'
        unique_together = (('owner', 'vacancy', 'object'), ('owner', 'rent', 'object'))

    #  def get_owner(self):
    #      return ExtUser.objects.get(id)

    def clean(self):
        # Don't allow draft entries to have a pub_date.
        if self.vacancy is not None and self.rent is not None:
            raise ValidationError('User request can contain only one field vacancy or rent')


class UserResponse(models.Model):
    owner = models.ForeignKey(ExtUser)
    userRequest = models.OneToOneField(UserRequest)
    status = models.BooleanField(default=False)

    text = models.TextField()

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = u'Ответ пользователя'
        verbose_name_plural = u'Ответы пользователей'
