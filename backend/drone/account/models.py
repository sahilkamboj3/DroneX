from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager
from django.conf import settings
from rest_framework.authtoken.models import Token
from django.dispatch import receiver
from django.db.models.signals import post_save


class AccountManager(BaseUserManager):
    def create_user(self, email, name, username, password=None):
        if not email:
            raise ValueError('Email is required.')

        if not name:
            raise ValueError('Name is required.')

        if not username:
            raise ValueError('Username is required.')

        user = self.model(
            email=self.normalize_email(email),
            username=username,
            name=name
        )
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, name, username, password):
        user = self.create_user(
            email=self.normalize_email(email),
            password=password,
            name=name,
            username=username
        )

        user.is_admin = True
        user.is_staff = True
        user.is_superuser = True
        user.save(using=self._db)
        return user


def upload_path_profile_image(instance, filename):
    return '/'.join(['profile_images', filename])


class Account(AbstractBaseUser):
    email = models.EmailField(verbose_name='email', max_length=60, unique=True)
    name = models.CharField(verbose_name='name', max_length=30)
    username = models.CharField(max_length=30, unique=True)
    profile_image = models.ImageField(
        null=True, blank=True, upload_to=upload_path_profile_image)

    is_admin = models.BooleanField(verbose_name='is admin', default=False)
    is_staff = models.BooleanField(verbose_name='is staff', default=False)
    is_superuser = models.BooleanField(
        verbose_name='is superuser', default=False)
    is_active = models.BooleanField(verbose_name='is active', default=True)
    date_joined = models.DateTimeField(auto_now_add=True)
    last_login = models.DateTimeField(auto_now=True)

    objects = AccountManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username', 'name']

    def __str__(self):
        return self.email

    def has_perm(self, perm, obj=None):
        return self.is_admin

    def has_module_perms(self, app_label):
        return True


class Orders(models.Model):
    customer = models.ForeignKey(Account, null=True, on_delete=models.CASCADE)
    count = models.IntegerField()
    date_created = models.DateTimeField(auto_now_add=True)
    final_cost = models.FloatField()

    def __str__(self):
        return self.customer.name


class DiscountCodes(models.Model):
    string = models.CharField(max_length=20)
    percentOff = models.IntegerField()

    def __str__(self):
        return self.string


def upload_path(instance, filename):
    return '/'.join(['images', filename])


class Reviews(models.Model):
    user = models.ForeignKey(Account, null=True, on_delete=models.CASCADE)
    review = models.CharField(max_length=10000, blank=False)
    date_created = models.DateTimeField(auto_now_add=True)
    stars = models.PositiveIntegerField(
        default=5, validators=[MinValueValidator(1), MaxValueValidator(5)])
    image = models.ImageField(blank=True, null=True, upload_to=upload_path)
    is_anonymous = models.BooleanField(null=True)

    def __str__(self):
        return self.review
