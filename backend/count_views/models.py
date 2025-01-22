from django.db import models
from django.utils import timezone
from rest_framework import serializers

class ViewMyPage(models.Model):

    timestamp = models.DateTimeField(default=timezone.now)
    user = models.CharField(max_length=20, default="NONE")
    city = models.CharField(max_length=20, default="NONE")
    region = models.CharField(max_length=20, default="NONE")
    country = models.CharField(max_length=20, default="NONE")
    country_name = models.CharField(max_length=20, default="NONE")
    country_name_iso_2 = models.CharField(max_length=3, default="NONE")
    ip = models.CharField(max_length=40, default="NONE")
    version = models.CharField(max_length=20, default="NONE")
    page = models.CharField(max_length=10, default="NONE")

    def __str__(self):
        return self.country_name_iso_2


class ViewMyPageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ViewMyPage
        fields = ("country_name_iso_2", )

    def to_representation(self, instance):
        ret = super().to_representation(instance)
        return ret