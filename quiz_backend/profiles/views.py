from django.contrib.auth.models import User
from django.core.exceptions import ObjectDoesNotExist

from rest_framework import status
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from rest_framework.views import APIView
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.authtoken.serializers import AuthTokenSerializer
from rest_framework.viewsets import ModelViewSet
from rest_framework.views import APIView
from rest_framework import generics
from rest_framework.decorators import detail_route


from .utils import EmailActivation
from .serializers import UserSerializer, UserProfileSerializer, UserBaseSerializer
from .models import UserProfile

email_activation = EmailActivation()

@api_view(['POST'])
def register(request):
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
        return Response({'token': token.key},status=status.HTTP_201_CREATED)
    else:
        return Response({'error': {'errors': 'Bad token'}}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def logout(request):
    try:
        Token.objects.get(key=request.data['token']).delete()
        return Response(status=status.HTTP_200_OK)
    except (ObjectDoesNotExist, KeyError):
        return Response({'error': {'errors': 'Bad token'}}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def login(request):
    serializer = AuthTokenSerializer(data=request.data,
                                       context={'request': request})
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
    queryset = UserProfile.objects.all()
    serializer_class = UserProfileSerializer
    http_method_names = ['get', 'put', 'head']

