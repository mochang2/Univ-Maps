from django.urls import path, include
from . import views

app_name = "users"

urlpatterns = [
    path("signup/", views.signup),
    path("test/", views.test),
]
