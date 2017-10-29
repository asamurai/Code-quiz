from django.core.exceptions import ObjectDoesNotExist
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from .utils import EmailActivation
from .serializers import UserSerializer

email_activation = EmailActivation()

@api_view(['POST'])
def register(request):
    serialized = UserSerializer(data=request.data)
    if serialized.is_valid(raise_exception=True):
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
        return Response(status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def logout(request):
    try:
        Token.objects.get(key=request.data['token']).delete()
        return Response(status=status.HTTP_200_OK)
    except ObjectDoesNotExist:
        return Response(status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def restore_password(request):
    try:
        email_activation.re_activate(request.data['email'])
        return Response(status=status.HTTP_200_OK)
    except Exception as e:
        return Response(status=status.HTTP_400_BAD_REQUEST)
