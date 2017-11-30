from django.contrib.auth.models import User
from rest_framework import serializers
from .models import UserProfile


class UserSerializer(serializers.ModelSerializer):
    password_confirm = serializers.CharField(style={'input_type': 'password'}, write_only=True)

    class Meta:
        model = User
        fields = ('username', 'email', 'password', 'password_confirm')

    def validate(self, data):
        if data['password'] != data['password_confirm']:
            raise serializers.ValidationError({"password_confirm":"Passwords do not match"})
        print(data.pop('password_confirm'))
        return data.pop('password_confirm')


class UserBaseSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id','username', 'email', 'first_name', 'last_name')


class UserProfileSerializer(serializers.HyperlinkedModelSerializer):
    username = serializers.CharField(source='user.username')
    first_name = serializers.CharField(source='user.first_name',required=False)
    last_name = serializers.CharField(source='user.last_name',required=False)
    email = serializers.CharField(source='user.email',required=False)
    user_id = serializers.CharField(source='user.id',required=False)
    profile_image = serializers.ImageField(source='user.profile_image',required=False)
    # bio = serializers.TextField(source='user.bio', required=False)

    class Meta:
        model = UserProfile
        fields = ('user_id', 'email', 'profile_image', 'bio', 'username', 'first_name', 'last_name')