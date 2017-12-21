from rest_framework import serializers
from .models import QuizCategory, Question, Quiz


class QuizCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = QuizCategory
        fields = '__all__'


class QuizSerializer(serializers.ModelSerializer):
    class Meta:
        model = Quiz
        fields = '__all__'


class QuestionsSerializer(serializers.ModelSerializer):
    answers = serializers.HyperlinkedRelatedField(many=True, view_name='track-detail')

    class Meta:
        model = Question
        fields = ('test', 'chain', 'level', 'source', 'answers')