from django.shortcuts import render
from secrets import token_urlsafe
from .models import User

# Create your views here.


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

            # 밥먹고 돌아와서 중복된 아이디 검증만 다시 하면 됨
            try:
                user = User.objects.create_user(username, email, password)
            except Exception:
                error = "이미 존재하는 아이디입니다."
                data.update({"error": error})  ##data 업데이트 다시 해줘야돼
                # 에러 해결하자
                print(data)
                return render(request, "users/signup.html", data)

            user.gender = gender
            user.save()  # 회원가입 완료

            signup_success = "signup success"
            data.update({"signup_success": signup_success})

        # signup 1단계 제출시
        elif join_agreement:
            data.update({"token_url": token_urlsafe()})
            # token 관했던 블로그 => 구글에 python token generator나 python secrets 검색

    # signup 1단계 제출 전 처음 보여주는 html
    return render(request, "users/signup.html", data)


def login(request):
    return render(request, "users/login.html")