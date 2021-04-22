from django.urls import path
from . import views

app_name = "readypage"

urlpatterns = [
    path("", views.index, name="main_with_logos"),
]
