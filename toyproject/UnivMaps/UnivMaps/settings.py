"""
Django settings for UnivMaps project.

Generated by 'django-admin startproject' using Django 3.1.7.

For more information on this file, see
https://docs.djangoproject.com/en/3.1/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/3.1/ref/settings/
"""

from pathlib import Path
import os
from decouple import config
from datetime import timedelta

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent
# 현재는 /project/toyproject/UnivMaps


# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/3.1/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = config("SECRET_KEY")

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = config("DEBUG")  # 배포 시에는 False로 둠

ALLOWED_HOSTS = []


# Application definition

INSTALLED_APPS = [
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",
    "axes",
    "captcha",
    "main_page",
    "hanyang_map",
    "users",
    "posts",
    "readypage",
]

MIDDLEWARE = [
    "django.middleware.security.SecurityMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
    "axes.middleware.AxesMiddleware",
]

AXES_FAILURE_LIMIT = 5
AXES_COOLOFF_TIME = timedelta(minutes=10)
AXES_LOCK_OUT_BY_COMBINATION_USER_AND_IP = True
AXES_RESET_ON_SUCCESS = True
# AXES_LOCKOUT_CALLABLE = "users.views.lockout" 이 함수를 통해 락 메시지 커스터마이징 가능
# AXES 참고: https://django-axes.readthedocs.io/en/latest/index.html

ROOT_URLCONF = "UnivMaps.urls"

TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [os.path.join(BASE_DIR, "templates")],
        "APP_DIRS": True,
        "OPTIONS": {
            "context_processors": [
                "django.template.context_processors.debug",
                "django.template.context_processors.request",
                "django.contrib.auth.context_processors.auth",
                "django.contrib.messages.context_processors.messages",
            ],
        },
    },
]

WSGI_APPLICATION = "UnivMaps.wsgi.application"


# Database
# https://docs.djangoproject.com/en/3.1/ref/settings/#databases

DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.mysql",
        "NAME": config("DB_NAME"),
        "USER": config("DB_USER"),
        "PASSWORD": config("DB_PASSWORD"),
        "HOST": config("DB_HOST"),
        "PORT": config("DB_PORT"),
    }
}
"""{
    "default": {
        "ENGINE": "django.db.backends.sqlite3",
        "NAME": BASE_DIR / "db.sqlite3",
    }
}"""


# Password validation
# https://docs.djangoproject.com/en/3.1/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        "NAME": "django.contrib.auth.password_validation.UserAttributeSimilarityValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.MinimumLengthValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.CommonPasswordValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.NumericPasswordValidator",
    },
]


# Internationalization
# https://docs.djangoproject.com/en/3.1/topics/i18n/

# 지역 시각 및 다국어 설정
LANGUAGE_CODE = "ko-kr"
TIME_ZONE = "Asia/Seoul"
USE_I18N = True
USE_L10N = True
# USE_TZ = True  #axes 를 사용하기 위해 주석 처리. timezone의 conflict 발생
# https://www.programmersought.com/article/88891092827/ 참고


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/3.1/howto/static-files/


# 정적 파일 설정
STATIC_URL = "/static/"
# static file들이 어디 있는지 적어줌(for django 개발 서버)
STATICFILES_DIRS = [
    os.path.join(BASE_DIR, "main_page/static"),
    os.path.join(BASE_DIR, "hanyang_map/static"),
    os.path.join(BASE_DIR, "users/static"),
    os.path.join(BASE_DIR, "posts/static"),
    os.path.join(BASE_DIR, "readypage/static"),
]
# 배포 단계에서 성능 문제로 static file들을 한 곳에 모아줌(for 웹 서버)
STATIC_ROOT = os.path.join(BASE_DIR, "staticfiles")

AUTH_USER_MODEL = "users.User"  # 'AppName.모델명' - 에러 해결

"""
프로젝트에 이미 저장되어져 있는 파일, 개발할 때 이미 준비되어진 파일 = "Static"
웹 서비스 이용자들이 업로드하는 파일 = "Media"

# 파일 업로드 기능 구현
MEDIA_URL = "/media/"
MEDIA_ROOT = os.path.join(BASE_DIR, "media")

"""
"""
runserver 테스트 서버 구동 시에 /media 경로를 올바로 찾지 못하는 문제가 발생한다.
따라서 URL 패턴 매칭을 해주는 다음 코드가 필요하다.

urlpatterns = [
    ....
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
"""


# superuser: qkdtnseo179, passwd: QW!@er
