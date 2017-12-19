from django.contrib.auth.models import User
from django.core.exceptions import ObjectDoesNotExist
from rest_framework import status
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from rest_framework.views import APIView
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated


from .utils import EmailActivation
from .serializers import UserSerializer, UserProfileSerializer
from .models import UserProfile

email_activation = EmailActivation()

@api_view(['POST'])
def register(request):
    serialized = UserSerializer(data=request.data)
    if serialized.is_valid(raise_exception=True):
        request.data.pop('password_confirm')
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
    """
    Changing password via email confirmation]

    """
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

    @permission_classes((IsAuthenticated,))
    def put(self, request, id):
        """
        PUT http://testserver/user/id/1/
        Changing UserProfile model and django.auth model instances
        :param request: JSON request data
        :param id: user_id
        :return: HTTP_200_OK
        """
        serialized = UserProfileSerializer(data=request.data)
        if serialized.is_valid(raise_exception=True):
            if id != request.data['user_id']:
                return Response({'error': {'errors': 'You do not have permission to change user info'}},
                                status=status.HTTP_200_OK)
            else:
                profile = UserProfile.objects.get(user_id=int(id))
                profile.user.last_name = request.data['last_name']
                profile.user.first_name = request.data['first_name']
                profile.user.username = request.data['username']
                profile.user.email = request.data['email']
                profile.user.save()
                UserProfile.objects.filter(user_id=int(id)).update(bio=request.data['bio'])
                if request.FILES:
                    UserProfile.objects.filter(user_id=int(id)).update(profile_image=request.FILES['profile_image'])
                return Response({'Response': 'ok'}, status=status.HTTP_200_OK)
