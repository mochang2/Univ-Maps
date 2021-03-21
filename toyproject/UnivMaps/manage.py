#!/usr/bin/env python

# py manage.py ~~
# 프로젝트 관리 명령어 모음 (startapp, runserver, createsuperuser,
# makemigrations(app의 모델 변경 사항 체크), migrate(변경 사항을 db에 반영),
# shell(cmd에서 python실행 가능), collectstatic(static 파일을 한 곳에 모음),
# test app이름)

"""Django's command-line utility for administrative tasks."""
import os
import sys


def main():
    """Run administrative tasks."""
    os.environ.setdefault("DJANGO_SETTINGS_MODULE", "UnivMaps.settings")
    try:
        from django.core.management import execute_from_command_line
    except ImportError as exc:
        raise ImportError(
            "Couldn't import Django. Are you sure it's installed and "
            "available on your PYTHONPATH environment variable? Did you "
            "forget to activate a virtual environment?"
        ) from exc
    execute_from_command_line(sys.argv)


if __name__ == "__main__":
    main()
