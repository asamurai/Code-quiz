from django.test import TestCase

from rest_framework.test import APIRequestFactory
from rest_framework.test import force_authenticate
from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token
from django.contrib.auth import get_user_model

from .models import UserProfile


class UsersUpdate(TestCase):

    def test_put(self):
        '''
        Test for /PUT/ users request. Add image in this path to test
        '''
        user_model = get_user_model()
        new_user = {'user':'test_user', 'password': 'verylongpassword'}
        user = user_model.objects.create_user(**new_user)
        user.is_active = True
        user.save()
        UserProfile.objects.create(user=user)
        token, created = Token.objects.get_or_create(user='test_user')
        factory = APIRequestFactory()

        user = User.objects.get(id=1)
        with open('image.jpg') as image_file:
            data = {"user_id":"4","email":"email@email.ru","bio":"value2","username":"value1",
                "first_name":"boba","last_name":"deb", "profile_image": image_file}

        request = factory.put('/user/4/',data=data)
        force_authenticate(request, user=user, token=user.auth_token)
        print(request.body)