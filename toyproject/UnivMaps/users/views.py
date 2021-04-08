from django.shortcuts import render

# Create your views here.


def signup(request):
    data = {}
    if request.method == "GET":
        if request.GET.get("agree-with-terms", None) == "agree-with-terms":
            print(22)
    return render(request, "users/signup.html", data)


def test(request):
    return render(request, "users/test.html")