from django.shortcuts import render

# Create your views here.


def signup(request):
    data = {}
    return render(request, "users/signup.html", data)