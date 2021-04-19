from django.shortcuts import render, redirect


def index(request):
    data = {}
    return render(request, "posts/posts_home.html", data)