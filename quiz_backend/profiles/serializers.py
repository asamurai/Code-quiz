from django.contrib.auth.models import User
from rest_framework import serializers
from .models import UserProfile
from django.contrib.auth.password_validation import validate_password
from rest_framework.validators import UniqueValidator


class UserSerializer(serializers.ModelSerializer):
    confirmPassword = serializers.CharField(style={'input_type': 'password'}, write_only=True)

    class Meta:
        model = User
        fields = ('username', 'email', 'password', 'confirmPassword')

    def validate(self, data):

        if data['password'] != data['confirmPassword']:
            raise serializers.ValidationError({"confirmPassword": "Passwords do not match"})
        return data


class UserBaseSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id','username', 'email', 'first_name', 'last_name')


class UserProfileSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source='user.username', validators=[UniqueValidator(queryset=User.objects.all(),
                                                                                         message='Username already exists')])
    first_name = serializers.CharField(source='user.first_name', required=False)
    last_name = serializers.CharField(source='user.last_name', required=False)
    email = serializers.CharField(source='user.email', validators=[UniqueValidator(queryset=User.objects.all(),
                                                                                         message='Email already exists')])
    user_id = serializers.PrimaryKeyRelatedField(source='user.id', read_only=True)

    class Meta:
        model = UserProfile
        fields = ('user_id', 'email', 'profile_image', 'bio', 'username', 'first_name', 'last_name')
        extra_kwargs = {'bio': {'required': False}, 'profile_image': {'required': False}}

    def update(self, instance, validated_data):
        user_dict = validated_data.get('user')
        user = instance.user
        user.email = user_dict.get('email', user.email)
        user.first_name = user_dict.get('first_name', user.first_name)
        user.last_name = user_dict.get('last_name', user.last_name)
        user.username = user_dict.get('username', user.username)
        user.save()
        instance.bio = validated_data.get('bio', None)
        instance.profile_image = validated_data.get('profile_image', None)
        instance.save()
        return instance


class ChangePasswordSerializer(serializers.Serializer):
    """
    Serializer for password change endpoint.
    """
    old_password = serializers.CharField(required=True)
    new_password = serializers.CharField(required=True)
    confirm_password = serializers.CharField(required=True)

    def validate_new_password(self, value):
        validate_password(value)
        return value

    def validate(self, data):
        if data.get('new_password') != data.get('confirm_password'):
            raise serializers.ValidationError("Those passwords don't match.")
        return data


class UserSimpleSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id','username', 'first_name', 'last_name')