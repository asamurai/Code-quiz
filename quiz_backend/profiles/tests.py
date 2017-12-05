from django.test import TestCase

from rest_framework.test import RequestsClient
from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token
from django.contrib.auth import get_user_model
from django.test.utils import override_settings


from .models import UserProfile


class UsersCRUD(TestCase):

    def setUp(self):
        user_model = get_user_model()
        new_user = {'username': 'test_user', 'password': 'verylongpassword', 'email': 'email@mail.ru'}
        self.user = user_model.objects.create_user(**new_user)
        self.user.is_active = True
        self.user.save()
        self.obj = UserProfile.objects.create(user=self.user)
        self.obj.save()

    @override_settings(DEBUG=True)
    def test_put_users(self):
        '''
        Test for /PUT/ users request. Add image in this path to test
        '''
        token, created = Token.objects.get_or_create(user=self.user)
        client = RequestsClient()
        user = User.objects.get(id=1)
        data = {"user_id":"4","email":"email@email.ru","bio":"value2","username":"value1",
                "first_name":"boba","last_name":"deb"}
        headers = {"Authorization": "Token {}".format(token)}
        request = client.put('http://testserver/user/id/1/', headers=headers, data=data,
                             files={'profile_image': open('image.jpg', 'rb')})
        print(request.text)
        self.assertEqual(request.status_code, 200)


    def test_get(self):
        client = RequestsClient()
        request = client.get('http://testserver/user/id/1/')
        print(request.text)