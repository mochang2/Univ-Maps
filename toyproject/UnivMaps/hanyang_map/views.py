from django.shortcuts import render
from django.http import HttpResponse


def index(request):
    return render(request, "hanyang_map/hanyang_map_main.html")