# from django.contrib.auth import get_user_model
from django.contrib.auth.models import User
from rest_framework import serializers
from .models import UserProfile

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username', 'email', 'password')


class UserBaseSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id','username', 'email', 'first_name', 'last_name')


class UserProfileSerializer(serializers.ModelSerializer):
    user = UserBaseSerializer()

    class Meta:
        model = UserProfile
        fields = ('user, 'profile_image', 'bio')