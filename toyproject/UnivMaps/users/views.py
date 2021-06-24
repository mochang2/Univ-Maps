from django.shortcuts import render, redirect
from django.http import HttpResponseBadRequest
from secrets import token_urlsafe
from .models import User
from django.contrib.auth import authenticate, login as auth_login, logout as auth_logout
from re import compile, match
from urllib.parse import urlparse


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

            # 백엔드에서 패스워드 한번더 검증
            ## 웹서버 배포후에 웹 프록시로 한번더 테스트 해보기(툴로 변조 가능한 부분)
            passwd_rule = compile(
                "^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,20}$"
            )
            passwd_validation = passwd_rule.match(password)
            if passwd_validation == None or password != confirm_password:
                return HttpResponseBadRequest(
                    "데이터 변조가 의심됩니다.\
                    안전한 환경에서 다시 시도해주세요."
                )

            try:  # 마지막으로 아이디 중복만 검사하고 계정 생성
                ## 웹서버 배포후에 웹 프록시로 한번더 테스트 해보기(툴로 변조 가능한 부분)
                user = User.objects.create_user(username, email, password)
            except Exception:
                # 아이디 중복 체크 이후 다시 post request가 발생할 동안 같은 id가 만들어졌거나
                # web proxy 등을 통해 아이디 중복 체크를 우회한 것이라고 판단
                error = "이미 존재하는 아이디입니다."
                data.update(
                    {
                        "username": username,
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
    if request.user.is_authenticated:
        return redirect("posts:posts_home")

    error = ""
    if request.method == "POST":
        username = request.POST["username"]
        password = request.POST["password"]
        user = authenticate(username=username, password=password)
        if user:
            auth_login(request, user)
            return redirect("posts:posts_home")
        else:
            error = "아이디나 비밀번호가 일치하지 않습니다."
            return render(request, "users/login.html", {"error": error})

    return render(request, "users/login.html")


def logout(request):
    auth_logout(request)
    return redirect("posts:posts_home")


def mypage(request):
    if request.user.is_authenticated:
        return render(request, "users/mypage.html")
    else:
        return HttpResponseBadRequest(
            "You are not authorized.\
            Do not access with URL without login. \
            Please login first."
        )


def findpasswd(request):
    data = {}
    return render(request, "users/findpasswd.html", data)


def checkifIDduplicated(request):
    # 아이디 중복 확인
    data = {}
    if request.method == "POST":
        before_checking_if_available = request.POST.get("check_username", None)
        if not User.objects.filter(username=before_checking_if_available).exists():
            data.update({"available_username": before_checking_if_available})

        print(before_checking_if_available)

        return render(request, "users/checkifIDduplicated.html", data)

    # URL을 통한 직접 접근을 차단
    ## 배포하고 한번더 확인할 필요가 있다.
    referer = urlparse(request.headers.get("Referer", "")).path

    if referer == "/auth/signup" or referer == "/auth/signup/":
        return render(request, "users/checkifIDduplicated.html")

    return HttpResponseBadRequest("You are not allowed to directly access through URL.")