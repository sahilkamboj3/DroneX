from django.contrib import admin
from django.urls import path
from account.views import (
    get_users_view,
    logout_view,
    login_view,
    get_user_view,
    signup_view,
    delete_profile_view,
    profile_view,
    pay_view,
    pay_email_view,
    discount_view,
    post_review_view,
    get_review_view,
    forgot_password_view,
    change_password_view,
    change_name_view,
    change_username_view,
    change_profileimage_view,
    share_and_create_discount,
    delete_discount_view,
)

from django.contrib.staticfiles.urls import staticfiles_urlpatterns
from django.conf import settings
from django.conf.urls.static import static
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView


urlpatterns = [
    path('admin/', admin.site.urls, name='admin'),
    path('api/users/', get_users_view, name='api_get_users'),
    path('api/user/<id>', get_user_view, name='api_get_user'),
    path('api/login/', login_view, name='api_login'),
    path('api/logout/', logout_view, name='api_logout'),
    path('api/signup/', signup_view, name='api_signup'),
    path('api/token/', TokenObtainPairView.as_view()),
    path('api/token/refresh/', TokenRefreshView.as_view()),
    path('api/profile/', profile_view, name='api_profile'),
    path('api/pay/', pay_view, name='api_pay'),
    path('api/pay/email/', pay_email_view, name='api_pay_email'),
    path('api/discount/', discount_view, name='api_discount'),
    path('api/delete/discount/', delete_discount_view, name='api_delete_discount'),
    path('api/share/creatediscount/', share_and_create_discount,
         name='api_share_create_discount'),
    path('api/post/review/', post_review_view, name='api_post_review'),
    path('api/get/review/', get_review_view, name='api_get_review'),
    path('api/delete/profile/', delete_profile_view, name='api_delete_profile'),
    path('api/forgotpassword/', forgot_password_view, name='api_forgot_password'),
    path('api/changepassword/', change_password_view, name='api_change_password'),
    path('api/changename/', change_name_view, name='api_change_name'),
    path('api/changeusername/', change_username_view, name='api_change_username'),
    path('api/changeprofileimage/', change_profileimage_view,
         name='api_change_profileimage'),
]

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
