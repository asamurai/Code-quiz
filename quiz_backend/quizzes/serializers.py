from django.core.exceptions import ObjectDoesNotExist

from rest_framework import serializers
from rest_framework.fields import CurrentUserDefault

from .models import QuizCategory, Question, Quiz, Answer, Chain, Topic, UserProgress
from profiles.serializers import UserSimpleSerializer


class QuizCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = QuizCategory
        fields = '__all__'


class QuizSerializer(serializers.ModelSerializer):
    class Meta:
        model = Quiz
        fields = '__all__'
        depth = 3


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
        if data['chain'].chain_category.id != data['quiz'].topic.category.id:
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
        Answer.objects.filter(question=instance).exclude(id__in=[answer.get('id',None) for answer in answers_data]).delete()
        for answer_data in answers_data:
            id = answer_data.get('id', None)
            if id is None:
                Answer.objects.create(**answer_data, question=instance)
            else:
                Answer.objects.filter(id=id).update(**answer_data)
        return instance


class QuizNestedSerializer(serializers.ModelSerializer):
    # questions = QuestionsSerializer(many=True, read_only=True)

    class Meta:
        model = Quiz
        fields = ("id", "topic", "title", "description", "image", "created")
        # extra_kwargs = {'user': {'read_only': True}}


class QuizReadSerializer(serializers.ModelSerializer):
    questions = QuestionsSerializer(many=True, read_only=True)
    user = UserSimpleSerializer(read_only=True)

    class Meta:
        model = Quiz
        fields = ("id", "user", "topic", "title", "description", "image", "created", "questions")


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
    # is_finish = serializers.BooleanField()

    class Meta:
        model = Question
        fields = ("id", "quiz", "chain", "level", "source", "answers", "text_question")
        extra_kwargs = {'quiz': {'read_only': True}, 'chain': {'read_only': True}, 'level': {'read_only': True} ,
                        'source': {'read_only': True}, "text_question": {'read_only': True}, "answer": {'many': False, 'required': True}}


class QuestionsSerializerPost(serializers.ModelSerializer):
    answers = serializers.PrimaryKeyRelatedField(many=True, queryset=Answer.objects)

    class Meta:
        model = Question
        fields = ("id", 'answers')
        extra_kwargs = {'id': {'read_only': False}}


    def create(self, validated_data):
        question_id = validated_data['id']
        answers = validated_data.get('answers')
        try:
            queryset = UserProgress.objects.filter(user=validated_data['owner']).filter(is_finished=False).filter(answer=None).get(question_id=question_id)
        except ObjectDoesNotExist:
            raise serializers.ValidationError('You have not got this question yet!')
        if not len(answers):
            raise serializers.ValidationError('You should answer on all questions')
        else:
            queryset.answer = answers[0]
            queryset.save()
        if len(answers) > 1:
            for answer in answers[1:]:
                UserProgress.objects.create(user=validated_data['owner'], question_id=question_id, answer=answer,
                                            datetime_started=queryset.datetime_started)
        # if queryset.question.level != Question.objects.filter(id=question_id).order_by('level').last().level:
        #     return True
        # else:
        #     UserProgress.objects.filter(user=validated_data['owner']).filter(question_id).update(is_finished=True)
        #     return False
