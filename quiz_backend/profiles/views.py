from django.contrib.auth.models import User
from django.core.exceptions import ObjectDoesNotExist
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from rest_framework.views import APIView

from .utils import EmailActivation
from .serializers import UserSerializer, UserProfileSerializer
from .models import UserProfile

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
        return Response({'error': {'errors': 'Bad token'}}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def logout(request):
    try:
        Token.objects.get(key=request.data['token']).delete()
        return Response(status=status.HTTP_200_OK)
    except ObjectDoesNotExist:
        return Response({'error': {'errors': 'Bad token'}}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def restore_password(request):
    try:
        email_activation.re_activate(request.data['email'])
        return Response(status=status.HTTP_200_OK)
    except Exception as e:
        return Response({'error': {'errors': 'Incorrect e-mail'}}, status=status.HTTP_400_BAD_REQUEST)


class UserView(APIView):
    """
    List all users, or create a new snippet.
    """
    def check_token(self, token):
        try:
            Token.objects.get(key=token)
            return True
        except ObjectDoesNotExist:
            return False

    def get_object(self, pk):
        try:
            user = User.objects.get(id=pk)
            return user
        except ObjectDoesNotExist:
            return False

    def get(self, request, id):
        user = self.get_object(id)
        if not user:
            return Response({'error': {'errors': 'User does not exist'}},status=status.HTTP_400_BAD_REQUEST)
        queryset = UserProfile.objects.get(user=user)
        serializer = UserProfileSerializer(queryset)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def put(self, request, id):
        print(request.user)
        print(UserProfile.objects.get(user=request.user))
        if UserProfileSerializer(data=request.data).is_valid(raise_exception=True):
            print(UserProfile.objects.get(user=user).id)

        return Response({'asdf':'ok'}, status=status.HTTP_200_OK)
