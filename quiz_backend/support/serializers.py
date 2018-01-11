from django.core.exceptions import ObjectDoesNotExist

from rest_framework import serializers

from .models import SupportCategory, SupportTopic, Comment
from profiles.serializers import UserSimpleSerializer


class SupportCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = SupportCategory
        fields = '__all__'


class CommentSerializer(serializers.ModelSerializer):
    user = UserSimpleSerializer(read_only=True)

    class Meta:
        model = SupportTopic
        fields = '__all__'


class SupportReadTopicSerializer(serializers.ModelSerializer):
    user = UserSimpleSerializer(read_only=True)
    comments = CommentSerializer(read_only=True)

    class Meta:
        model = SupportTopic
        fields = '__all__'

class SupportTopicSerializer(serializers.ModelSerializer):

    class Meta:
        model = SupportTopic
        fields = '__all__'