from django.shortcuts import render
from secrets import token_urlsafe

# Create your views here.


def signup(request):
    data = {}
    if request.method == "GET":
        to_make_url = request.GET.get("agree-with-terms", None)
        if to_make_url == "agree-with-terms":
            data.update({"token_url": token_urlsafe()})
            print(data["token_url"])
            # https://docs.python.org/3/library/secrets.html
            # https://blog.miguelgrinberg.com/post/the-new-way-to-generate-secure-tokens-in-python
            # token 관했던 블로그 => 구글에 python token generator나 python secrets 검색
    return render(request, "users/signup.html", data)


def test(request):
    return render(request, "users/test.html")