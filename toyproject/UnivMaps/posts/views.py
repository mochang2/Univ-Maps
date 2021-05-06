from django.shortcuts import render, redirect


def posts_home(request):
    data = {}
    return render(request, "posts/posts_home.html", data)