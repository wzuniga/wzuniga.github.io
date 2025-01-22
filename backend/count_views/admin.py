from django.contrib import admin
from .models import ViewMyPage


@admin.register(ViewMyPage)
class PostViewMyPage(admin.ModelAdmin):

    list_display = [
        'timestamp',
        'user',
        'city',
        'region',
        'country',
        'country_name',
        'ip',
        'version',
        'page'
    ]
