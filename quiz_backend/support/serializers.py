from django.core.exceptions import ObjectDoesNotExist

from rest_framework import serializers

from .models import SupportCategory, SupportTopic, Comment
from profiles.serializers import UserSimpleSerializer


class SupportCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = SupportCategory
        fields = '__all__'


class CommentSerializer(serializers.ModelSerializer):

    class Meta:
        model = Comment
        fields = '__all__'


class SupportReadTopicSerializer(serializers.ModelSerializer):
    user = UserSimpleSerializer()
    comments = CommentSerializer(many=True)

    class Meta:
        model = SupportTopic
        fields = ('id', 'user', 'name','category','rate','is_closed','created', 'comments')

class SupportTopicSerializer(serializers.ModelSerializer):

    class Meta:
        model = SupportTopic
        fields = '__all__'