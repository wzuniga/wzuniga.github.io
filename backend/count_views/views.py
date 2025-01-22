from django.shortcuts import render
from rest_framework.decorators import api_view
from django.views.decorators.csrf import csrf_exempt
from django.shortcuts import redirect
from django.http import HttpResponse
from .models import ViewMyPage
from .models import ViewMyPageSerializer
from datetime import datetime
from django.core import serializers
from django.utils.timezone import make_aware
from django.db.models import Count
from django.core.serializers.json import DjangoJSONEncoder
import json
import pytz

@api_view(['POST'])
@csrf_exempt
def redirect_front(request):
    request_body = json.loads(request.body)
    aware_datetime = make_aware(datetime.now())

    new_view = ViewMyPage(
        timestamp=aware_datetime,
        city = request_body["city"],
        region = request_body["region"],
        country = request_body["country"],
        country_name = request_body["country_name"],
        country_name_iso_2 = request_body["country_code3"],
        ip = request_body["ip"],
        version = request_body["version"],
        page = request_body["page"],
        user = request_body["user"],
    )
    new_view.save()
    return HttpResponse("")

@api_view(['GET'])
@csrf_exempt
def get_all_data(request):
    view_request = ViewMyPage.objects.values('country_name_iso_2').annotate(num_country = Count('country_name_iso_2'))
    serialized_q = json.dumps(list(view_request), cls=DjangoJSONEncoder)
    return HttpResponse(serialized_q, content_type='application/json')
