from django.urls import path
from . import views

app_name = "hanyang_map"

urlpatterns = [
    path("", views.index, name="index"),
]
