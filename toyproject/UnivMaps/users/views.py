from django.shortcuts import render, redirect
from django.http import HttpResponseBadRequest
from secrets import token_urlsafe
from .models import User
from .forms import FormWithCaptcha
from django.contrib.auth import authenticate, login as auth_login, logout as auth_logout
from re import compile, match
from urllib.parse import urlparse
from django.http import JsonResponse
from axes.models import AccessAttempt
import random
import string
from django.contrib.auth.hashers import check_password


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
        recaptcha_response = request.POST.get("g-recaptcha-response", "no recaptcha")

        if recaptcha_response == "no recaptcha":  # 로그인 실패가 4회 미만
            user = authenticate(request=request, username=username, password=password)

            if user:
                auth_login(request, user)
                return redirect("posts:posts_home")
            else:
                error = "아이디나 비밀번호가 일치하지 않습니다."
                # 4번 틀렸을 경우 recaptcha 주기
                if AccessAttempt.objects.filter(
                    username=username, failures_since_start=4
                ):
                    form = FormWithCaptcha()
                    return render(
                        request, "users/login.html", {"error": error, "form": form}
                    )
                else:
                    return render(request, "users/login.html", {"error": error})

        elif recaptcha_response == "":  # 로그인 실패가 4회인데 리캡차 체크 안 함
            error = "당신이 컴퓨터가 아님을 인증하세요."
            form = FormWithCaptcha()
            return render(request, "users/login.html", {"error": error, "form": form})

        else:  # 로그인 실패가 4회인데 리캡차 체크 함
            user = authenticate(request=request, username=username, password=password)

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


def findpasswd(request):
    data = {}
    if request.method == "POST":
        username = request.POST["username"]
        email = request.POST["email"]
        try:
            user = User.objects.get(username=username, email=email)
        except User.DoesNotExist:
            user = None

        if user:
            new_passwd = "".join(
                random.SystemRandom().choice(string.ascii_letters + string.digits)
                for _ in range(random.randint(8, 20))
            )
            user.set_password(new_passwd)
            user.save()
            msg = "비밀번호를 초기화 했습니다. 초기화 비밀번호는 " + new_passwd + " 입니다."
        else:
            msg = "일치하는 계정이 없습니다."

        data.update({"msg": msg})

    return render(request, "users/findpasswd.html", data)


def checkifIDduplicated(request):
    # 아이디 중복 확인
    data = {}
    if request.method == "POST":
        before_checking_if_available = request.POST.get("check_username", None)
        if not User.objects.filter(username=before_checking_if_available).exists():
            data.update({"available_username": before_checking_if_available})
        else:
            data.update({"unavailable_username": before_checking_if_available})

        return render(request, "users/checkifIDduplicated.html", data)

    # URL을 통한 직접 접근을 차단
    ## 배포하고 한번더 확인할 필요가 있다.
    referer = urlparse(request.headers.get("Referer", "")).path

    if referer == "/auth/signup" or referer == "/auth/signup/":
        return render(request, "users/checkifIDduplicated.html")

    return HttpResponseBadRequest("You are not allowed to directly access through URL.")


# 이 함수와 settings.py의 AXES_LOCKOUT_CALLABLE 변수를 통해 락 메시지 커스터마이징 가능
# def lockout(request, credentials, *args, **kwargs):
#     return JsonResponse({"status": "Locked out due to too many login failures"}, status=403)


def changepasswd(request):
    data = {}
    if request.method == "POST":
        current_passwd = request.POST.get("origin-passwd", None)
        user = request.user
        passwd_rule = compile(
            "^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,20}$"
        )

        if check_password(current_passwd, user.password):
            # 백엔드에서 다시 패스워드 유효성 검증 필요
            new_passwd = request.POST.get("new-passwd", None)
            new_passwd_confirm = request.POST.get("new-passwd-confirm", None)
            passwd_validation = passwd_rule.match(current_passwd)

            if passwd_validation == None or new_passwd != new_passwd_confirm:
                return HttpResponseBadRequest(
                    "데이터 변조가 의심됩니다.\
                안전한 환경에서 다시 시도해주세요."
                )
            else:
                user.set_password(new_passwd)
                user.save()
                auth_login(
                    request, user, backend="django.contrib.auth.backends.ModelBackend"
                )
                return redirect("posts:posts_home")

        else:
            error = "현재 비밀번호가 일치하지 않습니다."
            data.update({"error": error})

    return render(request, "users/changepasswd.html", data)