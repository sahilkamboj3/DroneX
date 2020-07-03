import datetime
import string
import random

from django.template.loader import render_to_string
from django.shortcuts import render
from django.core.mail import send_mail
from django.http import HttpResponse, Http404  # JsonResponse
from django.contrib.auth import authenticate, login, logout
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny

from .serializers import AccountSerializer
from .models import Account, AccountManager, Orders, DiscountCodes, Reviews

# Use Response to make a Table API version of the API through the website. This handles request.data as well in the body of the request.


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_users_view(request, *args, **kwargs):
    accounts = Account.objects.all()
    serializer = AccountSerializer(accounts, many=True)
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_user_view(request, *args, **kwargs):
    try:
        user_id = kwargs['id']
        user = Account.objects.get(id=user_id)
        serializer = AccountSerializer(user)
        return Response(serializer.data)
    except:
        raise Http404


@api_view(['POST'])
@permission_classes([AllowAny])
def login_view(request, *args, **kwargs):
    # check why it is saying "CSRF Failed: CSRF token missing or incorrect." in POSTMAN -> fixed by adding
    # DEFAULT_AUTHENTICATION_CLASSES = [
    #     'rest_framework.authentication.TokenAuthentication'
    # ]

    if request.user.is_authenticated:
        return Response({'message': 'User already logged in.'})

    email = request.data['email']
    password = request.data['password']
    user = authenticate(email=email, password=password)
    if user is not None:
        login(request, user)
        email = user.email
        username = user.username
        name = user.name

        data = {
            'email': email,
            'name': name,
            'username': username,
            'message': 'Logged in.'
        }

        return Response(data)

    else:
        return Response({'message': 'User invalid.'})


@api_view(['POST'])
@permission_classes([AllowAny])
def logout_view(request, *args, **kwargs):
    logout(request)
    data = {
        'message': 'Logged out.'
    }
    return Response(data)


@api_view(['POST'])
@permission_classes([AllowAny])
def signup_view(request, *args, **kwargs):
    name = request.data['name']
    username = request.data['username']
    email = request.data['email']
    password = request.data['password']
    try:
        if username and name and email and password:
            user = Account.objects.create(
                email=email,
                name=name,
                username=username
            )
            user.set_password(password)
            user.save()
            login(request, user)

            data = {
                'email': email,
                'name': name,
                'username': username,
                'message': 'Account created.'
            }

            return Response(data)
    except:
        data = {
            'email': email,
            'name': name,
            'message': 'Unique attribute failed.'
        }

        return Response(data)


@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def delete_profile_view(request, *args, **kwargs):
    try:
        user = Account.objects.get(email=request.user)
        user.delete()
        return Response({'message': 'account deleted'})
    except User.DoesNotExist:
        return Response({'message': "user doesn't exist"})


@api_view(['POST', 'GET'])
@permission_classes([IsAuthenticated])
def profile_view(request, *args, **kwargs):
    email = request.user
    user = Account.objects.get(email=email)

    order = []
    f = '%m-%d-%Y %I:%M %p'

    qs = Orders.objects.filter(customer_id=user.id)
    reviews = Reviews.objects.filter(user_id=user.id)

    reviews_array = []

    for review in reviews:
        cur_array = [review.date_created.strftime(
            f), review.stars, review.review]
        if review.image:
            if review.image.url[-3:] == 'jpg' or review.image.url[-3:] == 'peg' or review.image.url[-3:] == 'png':
                cur_array.append(['image', review.image.url])

            if review.image.url[-3:] == 'mp4':
                cur_array.append(['video', review.image.url])

        else:
            cur_array.append([None, None])

        reviews_array.append(cur_array)

    for q in qs:
        order.append([q.date_created.strftime(f), q.count, q.final_cost])

    data = {
        'name': user.name,
        'email': user.email,
        'username': user.username,
        'orders': order,
        'reviews': reviews_array,
    }

    if user.profile_image:
        data['profileImage'] = user.profile_image.url
    else:
        data['profileImage'] = None

    return Response(data)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def pay_view(request, *args, **kwargs):
    user = Account.objects.get(email=request.user)

    new_order = Orders.objects.create(
        customer=user, count=request.data['count'], final_cost=request.data['finalCost'])
    return Response({'message': 'payment gone through'})


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def pay_email_view(request, *args, **kwargs):
    count = request.data['count']
    final_cost = request.data['finalCost']
    user = Account.objects.get(email=request.user)
    to_email = user.email
    context = {
        'name': user.name,
        'count': count,
        'final_cost': final_cost
    }
    html_message = render_to_string('email.html', context=context)

    send_mail(
        'Thank you from DroneX!',
        'Test message.',
        'dronex327@gmail.com',
        [to_email],
        html_message=html_message,
        fail_silently=False,
    )

    return Response({'message': 'email sent'})


@api_view(['POST'])
@permission_classes([AllowAny])
def discount_view(request, *args, **kwargs):
    string = request.data['string']
    try:
        code = DiscountCodes.objects.get(string=string)
        return Response({'message': code.percentOff})
    except:
        return Response({'message': 'code doesnt exist'})


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def post_review_view(request, *args, **kwargs):
    rating = request.data['rating']
    review = request.data['review']
    is_anonymous = (request.data['isAnonymous']).capitalize()
    try:
        image = request.data['image']
    except KeyError:
        image = None

    email = request.user
    user = Account.objects.get(email=email)

    Reviews.objects.create(user=user, review=review,
                           stars=rating, image=image, is_anonymous=is_anonymous)
    return Response({'message': 'review created'})


@api_view(['GET'])
@permission_classes([AllowAny])
def get_review_view(request, *args, **kwargs):
    reviews = Reviews.objects.all()
    context = {}

    reviews_dict = []
    for review in reviews:

        review_dict = {
            'review': review.review,
            'isAnonymous': review.is_anonymous,
            'rating': review.stars,
            'dateCreated': review.date_created,
        }
        if review.is_anonymous:
            review_dict['name'] = 'Anonymous'
        else:
            review_dict['name'] = review.user.name
            # review_dict['name'] = review.user.username

        if review.image:
            if review.image.url[-3:] == 'jpg' or review.image.url[-3:] == 'peg' or review.image.url[-3:] == 'png':
                review_dict['imageURL'] = review.image.url

            if review.image.url[-3:] == 'mp4':
                review_dict['videoURL'] = review.image.url

        reviews_dict.append(review_dict)

    context = {
        'reviews': reviews_dict,
    }
    return Response(context)


@api_view(['POST'])
@permission_classes([AllowAny])
def forgot_password_view(request, *args, **kwargs):

    def returnRandomString(string_length=7):
        alpha_string = ""
        letters = string.ascii_lowercase
        for i in range(string_length):
            prob = random.random()
            if prob < 0.5:
                alpha_string += str(random.choice(letters).upper())
            else:
                alpha_string += str(random.choice(letters))
        return alpha_string

    def returnRandomNumbers(iterations=5):
        numbers = ""
        for i in range(iterations):
            numbers += str(random.randint(0, 9))
        return numbers
    try:
        user = Account.objects.get(email=request.data['email'])
    except:
        return Response({'message': "user doesn't exist"})

    to_email = user.email
    secure_str = f'{returnRandomString()}{returnRandomNumbers()}'

    context = {
        'name': user.name,
        'secure_code': secure_str
    }

    html_message = render_to_string('forgot_password.html', context=context)

    send_mail(
        'DroneX - Forgot Password',
        'Test message.',
        'dronex327@gmail.com',
        [to_email],
        html_message=html_message,
        fail_silently=False,
    )

    return_response = {
        'message': 'email sent',
        'code': secure_str
    }

    return Response(return_response)


@api_view(['POST'])
@permission_classes([AllowAny])
def change_password_view(request, *args, **kwargs):
    user = Account.objects.get(email=request.data['email'])
    new_password = request.data['newPassword']

    user.set_password(new_password)
    user.save()
    return Response({'message': 'password changed'})


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def change_name_view(request, *args, **kwargs):
    user = Account.objects.get(email=request.user)
    new_name = request.data['name']
    user.name = new_name
    user.save()
    return Response({'message': 'name changed'})


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def change_username_view(request, *args, **kwargs):
    user = Account.objects.get(email=request.user)
    new_username = request.data['username']
    user.username = new_username
    user.save()
    return Response({'message': 'username changed'})


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def change_profileimage_view(request, *args, **kwargs):
    image = request.data['image']

    email = request.user
    user = Account.objects.get(email=email)

    user.profile_image = image
    user.save()
    return Response({'message': 'profile image changed'})

# statistics views


@api_view(['GET'])
@permission_classes([AllowAny])
def stats_view(request, *args, **kwargs):
    return Response({'message': 'stats'})
