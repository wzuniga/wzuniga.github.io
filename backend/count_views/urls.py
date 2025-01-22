from django.urls import path
from . import views

urlpatterns = [
    path('', views.redirect_front),
    path('get_data_by_country', views.get_all_data),
    # path('test', RedirectView.as_view(url='http://127.0.0.1:3000/')),
]
