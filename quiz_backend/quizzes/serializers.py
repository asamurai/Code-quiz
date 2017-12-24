from rest_framework import serializers
from .models import QuizCategory, Question, Quiz, Answer

class QuizCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = QuizCategory
        fields = '__all__'


class QuizSerializer(serializers.ModelSerializer):
    class Meta:
        model = Quiz
        fields = '__all__'


class AnswerNestedSerializer(serializers.ModelSerializer):
    class Meta:
        model = Answer
        fields = ('answer', 'is_true', 'id')
        extra_kwargs = {'id': {'required': False, 'read_only': False}}



class QuestionsSerializer(serializers.ModelSerializer):
    answers = AnswerNestedSerializer(many=True)

    class Meta:
        model = Question
        fields = ("id", "quiz", "chain", "level", "source", "answers")
        extra_kwargs = {'id': {'read_only': True}}


    def create(self, validated_data):
        answers_data = validated_data.pop('answers')
        question = Question.objects.create(**validated_data)
        for answer_data in answers_data:
            Answer.objects.create(question=question, **answer_data)
        return question

    def update(self, instance, validated_data):
        answers_data = validated_data.get('answers')
        instance.chain = validated_data.get('chain')
        instance.level = validated_data.get('level')
        instance.source = validated_data.get('source')
        instance.text_question = validated_data.get('text_question')
        instance.save()
        to_delete = Answer.objects.filter(question=instance).exclude(id__in=[answer.get('id',None) for answer in answers_data]).delete()
        print(to_delete)
        for answer_data in answers_data:
            id = answer_data.get('id', None)
            if id is None:
                Answer.objects.create(**answer_data, question=instance)
            else:
                Answer.objects.filter(id=id).update(**answer_data)
        return instance
