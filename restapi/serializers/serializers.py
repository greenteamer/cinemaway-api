# coding: utf8
from rest_framework import serializers
from account.models import Worker, Employer
from django.contrib.auth.models import User


class WorkerSZ(serializers.ModelSerializer):
    # user = User.objects.all()
    class Meta:
        model = Worker
        fields = ('url', 'id', 'user')


class EmployerSZ(serializers.ModelSerializer):
    # user = User.objects.all()
    class Meta:
        model = Employer
        fields = ('url', 'id', 'user')


# class ProductObj(serializers.ModelSerializer):
#     # images = ProductImageObj(read_only=True, many=True)
#     # properties = PropertyValueObj(read_only=True, many=True)
#     images = ProductImage.objects.all()
#     properties = PropertyValue.objects.all()
#
#     class Meta:
#         model = Product
#         fields = ('url', 'id', 'category', 'name', 'slug', 'description', 'price', 'images', 'properties')
