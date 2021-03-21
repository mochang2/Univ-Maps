from django.urls import path
from . import views

app_name = "main_page"

urlpatterns = [
    path("", views.Main_Page_With_Logos, name="main_with_logos"),
]
