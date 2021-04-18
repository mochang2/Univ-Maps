from django.shortcuts import render, redirect
from secrets import token_urlsafe
from .models import User
from django.contrib.auth import authenticate, login as auth_login, logout as auth_logout


def signup(request):
    data = {}
    error = ""
    signup_success = ""
    if request.method == "POST":
        # signup 2단계 제출시
        username = request.POST.get("username", None)
        join_agreement = request.POST.get("agree-with-terms", None)

        if username:
            password = request.POST["password"]
            confirm_password = request.POST["confirm-password"]
            email = request.POST["email"]
            gender = request.POST["gender"]

            try:
                user = User.objects.create_user(username, email, password)
            except Exception:
                error = "이미 존재하는 아이디입니다."
                data.update(
                    {
                        "username": username,
                        "password": password,
                        "confirm_passord": confirm_password,
                        "email": email,
                        "gender": gender,
                    }
                )
                data.update({"token_url": token_urlsafe(), "error": error})
                return render(request, "users/signup.html", data)

            user.gender = gender
            user.save()

            signup_success = "signup success"
            data.update({"signup_success": signup_success})

        # signup 1단계 제출시
        elif join_agreement:
            data.update({"token_url": token_urlsafe()})
            # token 관했던 블로그 => 구글에 python token generator나 python secrets 검색

    # signup 1단계 제출 전 처음 보여주는 html
    return render(request, "users/signup.html", data)


def login(request):
    error = ""
    if request.method == "POST":
        username = request.POST["username"]
        password = request.POST["password"]
        user = authenticate(username=username, password=password)
        if user:
            auth_login(request, user)
            return redirect("/")
        else:
            error = "아이디나 비밀번호가 일치하지 않습니다."
            return render(request, "users/login.html", {"error": error})

    return render(request, "users/login.html")


def logout(request):
    auth_logout(request)
    return redirect("/")