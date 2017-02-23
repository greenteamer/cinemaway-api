# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from django.db import models
from authentication.models import ExtUser
from django.db.models import Q


class Room(models.Model):
    user1 = models.ForeignKey(ExtUser, related_name="room_user1")
    user2 = models.ForeignKey(ExtUser, related_name="room_user2")

    class Meta:
        unique_together = ('user1', 'user2')


class Message(models.Model):
    text = models.TextField()
    owner = models.ForeignKey(ExtUser, related_name="message_owner")
    object = models.ForeignKey(ExtUser, related_name="message_object")
    room = models.ForeignKey(Room)

    class Meta:
        verbose_name = u'Сообщение'
        verbose_name_plural = u'Сообщения'

    def __unicode__(self):
        return '{0} - {1} - {2}'.format(self.owner, self.object, self.id)

    @property
    def url(self):
        return "/rubrics/%s/" % self.id

    def save(self, *args, **kwargs):
        if not self.room:
            try:
                room = Room.objects.get(
                    Q(user1=self.owner, user2=self.object) |
                    Q(user1=self.owner, user2=self.object))
                self.room = room
            except Exception:
                self.room = Room(user1=self.owner, user2=self.object)
            raise ValueError("Error in save method of Message")
        super(Message, self).save(*args, **kwargs)
