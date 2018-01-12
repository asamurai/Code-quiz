from django.contrib.auth.models import User
from django.core.exceptions import ObjectDoesNotExist

from rest_framework import status
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from django.shortcuts import redirect
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from rest_framework.authtoken.serializers import AuthTokenSerializer
from rest_framework.viewsets import ModelViewSet


from .utils import EmailActivation
from .serializers import UserSerializer, UserProfileSerializer, UserBaseSerializer, ChangePasswordSerializer
from .models import UserProfile

email_activation = EmailActivation()

@api_view(['POST'])
def register(request):
    '''
    1st registration step. Validate passwords, email, username
    :param request: see UserSerializer
    :return:
    '''
    serialized = UserSerializer(data=request.data)
    if serialized.is_valid(raise_exception=True):
        request.data.pop('confirmPassword')
        email_activation.create_inactive_user(**request.data)
        return Response(email_activation.get_days(),
                        status=status.HTTP_201_CREATED)


@api_view(['GET'])
def activate(request, activation_key=None):
    """
    Given an an activation key, look up and activate the user
    account corresponding to that key (if possible).
    """
    user = email_activation.activate_user(activation_key)
    if user:

        token = Token.objects.update_or_create(user=user)[0]
        return redirect('http://127.0.0.1:8080/signin/token={}&id={}'.format(token, user.id))
    else:
        return redirect('http://127.0.0.1:8080/error')


@api_view(['POST'])
def logout(request):
    try:
        Token.objects.get(key=request.data['token']).delete()
        return Response(status=status.HTTP_200_OK)
    except (ObjectDoesNotExist, KeyError):
        return Response({'error': {'errors': 'Bad token'}}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def login(request):
    """
    Get token after sending credentials to /login
    :param request:
    :return:
    """
    serializer = AuthTokenSerializer(data=request.data)
    serializer.is_valid(raise_exception=True)
    user = serializer.validated_data['user']
    token, created = Token.objects.get_or_create(user=user)
    try:
        queryset = UserProfile.objects.get(user=user)
        serializer = UserProfileSerializer(queryset)
        return Response({'token': token.key, 'data': serializer.data}, status=status.HTTP_200_OK)
    except ObjectDoesNotExist:
        Response({'error': {'errors': 'Something bad'}}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def restore_password(request):
    """
    Changing password via email confirmation]

    """
    try:
        email_activation.re_activate(request.data['email'])
        return Response(status=status.HTTP_200_OK)
    except Exception as e:
        return Response({'error': {'errors': 'Incorrect e-mail'}}, status=status.HTTP_400_BAD_REQUEST)


class ProfilesViewSet(ModelViewSet):
    '''
    Changing user info with extended django user model
    '''
    permission_classes = (IsAuthenticated,)
    queryset = UserProfile.objects.all()
    serializer_class = UserProfileSerializer
    http_method_names = ['get', 'put', 'head']


class UpdatePassword(APIView):
    """
    An endpoint for changing password.
    curl http://127.0.0.1:8000/change_password/
    -H 'Authorization: Token 7a95bba5bb6e8207097f55daabebe56573a230cd'
    -X PUT -H "Content-Type: application/json"
    -d '{"old_password":"chainz1234", "new_password": "chainz1232", "confirm_password": "chainz1232"}'

    """
    permission_classes = (IsAuthenticated, )

    def get_object(self):
        return self.request.user

    def put(self, request):
        '''
        PUT handler for changing password
        :param request:new_password, old_password, confirm_password
        :return:
        '''
        self.object = request.user
        serializer = ChangePasswordSerializer(data=request.data)

        if serializer.is_valid():
            # Check old password
            old_password = serializer.data.get("old_password")
            if not self.object.check_password(old_password):
                return Response({"old_password": ["Wrong password."]},
                                status=status.HTTP_400_BAD_REQUEST)
            # set_password also hashes the password that the user will get
            self.object.set_password(serializer.data.get("new_password"))
            self.object.save()
            return Response(status=status.HTTP_200_OK)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)