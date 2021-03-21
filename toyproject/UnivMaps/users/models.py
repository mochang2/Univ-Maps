from django.db import models
from django.contrib.auth.models import AbstractUser


class User(AbstractUser):
    GENDER_CHOICES = (
        ("male", "Male"),
        ("female", "Female"),
    )
    gender = models.CharField(
        "Gender", max_length=80, choices=GENDER_CHOICES, null=True
    )
