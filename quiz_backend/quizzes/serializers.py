from rest_framework import serializers
from .models import QuizCategory, Question, Quiz, Answer, Chain, Topic


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
        fields = ("id", "quiz", "chain", "level", "source", "answers", 'text_question')
        extra_kwargs = {'id': {'read_only': True}}

    def validate(self, data):
        if data['chain'].chain_category.id != data['quiz'].category.id:
             raise serializers.ValidationError("Chain in quiz must appear on category")
        return data


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
        for answer_data in answers_data:
            id = answer_data.get('id', None)
            if id is None:
                Answer.objects.create(**answer_data, question=instance)
            else:
                Answer.objects.filter(id=id).update(**answer_data)
        return instance


class QuizNestedSerializer(serializers.ModelSerializer):
    questions = QuestionsSerializer(many=True)

    class Meta:
        model = Quiz
        fields = ("user", "topic", "title", "description", "image", "created", "questions")


class QuizSerializer(serializers.ModelSerializer):
    class Meta:
        model = Quiz
        fields = "__all__"


class ChainSerializer(serializers.ModelSerializer):
    class Meta:
        model = Chain
        fields = "__all__"


class TopicSerializer(serializers.ModelSerializer):
    class Meta:
        model = Topic
        fields = "__all__"


class AnswerNestedSerializerForPassing(serializers.ModelSerializer):
    class Meta:
        model = Answer
        fields = ('answer', 'id')
        extra_kwargs = {'id': {'required': False, 'read_only': False}, "answer": {'read_only': True}}


class QuestionsSerializerForPassing(serializers.ModelSerializer):
    answers = AnswerNestedSerializerForPassing(many=True)
    # answer =
    class Meta:
        model = Question
        fields = ("id", "quiz", "chain", "level", "source", "answers", "text_question")
        extra_kwargs = {'quiz': {'read_only': True}, 'chain': {'read_only': True}, 'level': {'read_only': True} ,
                        'source': {'read_only': True}, "text_question": {'read_only': True}, "answer": {'many': False, 'required': True}}