import random
import json

from django.shortcuts import get_object_or_404
from django.core.exceptions import ObjectDoesNotExist
from django.utils.timezone import now

from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticated
from rest_framework.exceptions import APIException
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import generics
from rest_framework import status
from rest_framework.exceptions import PermissionDenied, NotFound

from .serializers import QuizCategorySerializer, QuestionsSerializer, QuizSerializer, ChainSerializer, \
    AnswerNestedSerializerForPassing, QuestionsSerializerForPassing, TopicSerializer, QuizNestedSerializer, QuizReadSerializer, \
    QuestionsSerializerPost, QuizResult, QuestionSerializesGET

from .models import QuizCategory, Question, Quiz, Chain, Topic, UserProgress


class QuizCategoryViewSet(ModelViewSet):
    serializer_class = QuizCategorySerializer
    queryset = QuizCategory.objects.all()

    def list(self, request):
        serializer = QuizCategorySerializer(self.queryset, many=True)
        for data in serializer.data:
            data['top_topics'] = TopicSerializer(Topic.objects.filter(category__id=data['id']).all()[:5],
                                                 many=True).data
        return Response(serializer.data)

    def retrieve(self, request, pk=None):
        queryset = QuizCategory.objects.get(pk=pk)
        serializer = QuizCategorySerializer(queryset)
        serializer.data['topics'] = TopicSerializer(Topic.objects.filter(category__id=pk).all(),
                                                     many=True).data
        return Response(serializer.data)


class QuizViewSet(ModelViewSet):
    """ /quizzes
    GET quizzes, POST  and change quizzes with bearer auth
    """
    serializer_class = QuizReadSerializer
    queryset = Quiz.objects.all()
    http_method_names = ['get', 'post', 'head', 'put', 'delete']
    # permission_classes = (IsAuthenticated,)

    def create(self, request):
        """ Create quiz
        curl http://127.0.0.1:8000/quizzes/
        -H 'Authorization: Token 7a95bba5bb6e8207097f55daabebe56573a230cd'
        -X POST -H "Content-Type: application/json"  -d '{ "topic": 1, "title": "1", "description": "test" }'
        response:
        {"id":9,"topic":1,"title":"1","description":"test","image":null}
        :param request: json request
        :return:
        """
        serialized = QuizNestedSerializer(data=request.data)
        if serialized.is_valid(raise_exception=True):
            serialized.validated_data['user'] = request.user
            serialized.save()
            return Response(QuizReadSerializer(serialized.instance).data)

    def update(self,request,pk=None):
        """
        curl http://127.0.0.1:8000/quizzes/6/
        -H 'Authorization: Token 7a95bba5bb6e8207097f55daabebe56573a230cd'
        -X PUT -H "Content-Type: application/json"  -
        d '{ "topic": 1, "title": "1", "description": "test" }'
        :param request: json request
        :param pk: primary key for quiz instance
        :return: Full quiz data with user's lastname, firstname and questions with answers
        """
        serialized = QuizNestedSerializer(data=request.data)
        if serialized.is_valid(raise_exception=True):
            serialized.data['user'] = request.user
            try:
                quiz = Quiz.objects.get(pk=pk)
            except ObjectDoesNotExist:
                raise PermissionDenied()
            if quiz.user != request.user:
                raise PermissionDenied()
            serialized.update(quiz, serialized.validated_data)
            return Response(QuizReadSerializer(quiz).data)

    def get_queryset_by_user(self, request, id=None):
        serializer = QuizReadSerializer(Quiz.objects.filter(user__id=id).all(), many=True)
        return Response(serializer.data)

    def get_queryset_by_topic(self, request, id=None):
        serializer = QuizReadSerializer(Quiz.objects.filter(topic__id=id).all(), many=True)
        return Response(serializer.data)

    def get_permissions(self):
        """
        Instantiates and returns the list of permissions that this view requires.
        """
        if self.action in ['update', 'create', 'get_queryset_by_user']:
            permission_classes = [IsAuthenticated]
        else:
            permission_classes = []
        return [permission() for permission in permission_classes]

class QuestionViewSet(ModelViewSet):
    permission_classes = [IsAuthenticated]
    serializer_class = QuestionsSerializer
    queryset = Question.objects.all()


class ChainsList(generics.ListCreateAPIView):
    queryset = Chain.objects.all()
    serializer_class = ChainSerializer

    def list(self, request, id):
        # Note the use of `get_queryset()` instead of `self.queryset`
        queryset = self.get_queryset().filter(chain_category__id=id)
        serializer = ChainSerializer(queryset, many=True)
        return Response(serializer.data)


class ChainsListAll(generics.ListCreateAPIView):
    queryset = Chain.objects.all()
    serializer_class = ChainSerializer


class TopicViewSet(ModelViewSet):
    queryset = Topic.objects.all()
    serializer_class = TopicSerializer

    def get_queryset_by_category(self, request, id=None):
        serializer = TopicSerializer(Topic.objects.filter(category__id=id).all(), many=True)
        return Response(serializer.data)


class QuestionList(APIView):

    ''' Implements passing quiz '''

    permission_classes = (IsAuthenticated,)

    def get(self, request, id):
        # Check, have user passed any tests
        queryset = UserProgress.objects.filter(question__quiz__id=id).filter(user=request.user)
        # if user doesnt send answers on test
        # queryset_filtered = queryset.filter(answer=None)
        queryset_filtered = UserProgress.objects.filter(question__quiz__id=id).filter(user=request.user).filter(answer=None)
        if not UserProgress.objects.filter(question__quiz__id=id).filter(user=request.user).filter(answer=None):
            # if user pass test first time
            if not queryset.filter(is_finished=False):
                questions = Question.objects.filter(quiz__id=id).filter(level=1).order_by('chain', '?').distinct('chain')
                time_started = now()
            else:
                last_level = queryset.filter(is_finished=False).order_by('question__level').last().question.level
                time_started = queryset.order_by('question__level').last().datetime_started
                chain_exclude = []
                for question_instance in queryset.filter(question__level=last_level):
                    if not question_instance.answer.is_true:
                        chain_exclude.append(question_instance.question.chain)

                questions = Question.objects.filter(quiz__id=id).filter(level=last_level + 1).\
                    exclude(chain__in=chain_exclude).order_by('chain', '?').distinct('chain')

            for question in questions:
                UserProgress.objects.create(question=question, user=request.user, datetime_started=time_started)
        else:
            questions = Question.objects.filter(id__in=[q['question'] for q in list(queryset_filtered.values('question'))]).all()
        serializer = QuestionsSerializerForPassing(questions, many=True)
        return Response({'questions': serializer.data })

    def post(self, request, id):
        serializer = QuestionsSerializerPost(data=request.data, many=True)
        if serializer.is_valid(raise_exception=True):
            if len(UserProgress.objects.filter(user=request.user).filter(question__quiz__id=id).filter(answer=None)) != \
                    len(serializer.data):
                return Response({'error': {'errors': 'You should send all received questions'}}, status=status.HTTP_400_BAD_REQUEST)
            is_finished = False
            result_list = serializer.save(owner=request.user)
            level = UserProgress.objects.filter(user=request.user).filter(is_finished=False).filter(question__quiz_id=id).\
                order_by('question__level').last().question.level
            if level == Question.objects.filter(quiz_id=id).order_by('level').last().level or (True not in result_list):
                is_finished = True
                UserProgress.objects.filter(user=request.user).filter(question__quiz_id=id).filter(is_finished=False).update(is_finished=True)
            return Response({'is_finished': is_finished})

    def delete(self,request, id):
        UserProgress.objects.filter(user=request.user).filter(question__quiz_id=id).filter(is_finished=False).delete()
        return Response(status=status.HTTP_200_OK)


class QuizResultView(APIView):

    permission_classes = (IsAuthenticated,)

    def get(self, request, id):
        queryset = UserProgress.objects.filter(user_id=request.user).filter(question__quiz_id=id)\
            .filter(is_finished=True)
        if not queryset:
            raise NotFound('You have not passed this test')
        datetime_started = queryset.order_by('datetime_started').distinct('datetime_started')
        response_data = []
        for datetime_result in datetime_started:
            # quiz_serializes = QuizSerializer(Quiz.object.get(id=id)).data
            questions = queryset.filter(datetime_started=datetime_result.datetime_started).order_by('question').distinct('question')
            quiz = Quiz.objects.get(id=questions[0].question.quiz.id)
            levels = Question.objects.filter(quiz=quiz).order_by('level').last().level + 1
            chained_answers = 0
            for level in range(1, levels):
                chained_answers += Question.objects.filter(quiz=quiz).filter(level=level).order_by('chain').distinct('chain').count()
            quiz_serializer = QuizSerializer(quiz).data
            quiz_serializer['chained_answers'] = chained_answers
            correct_chained_answers = 0
            for question in questions:
                if question.answer.is_true:
                    correct_chained_answers += 1
            quiz_serializer['correct_chained_answers'] = correct_chained_answers
            quiz_serializer['questions'] = []
            for question in questions:
                answers = queryset.filter(datetime_started=datetime_result.datetime_started).filter(question_id=question.question.id).values('answer')
                chosen = []
                for answer in answers:
                    chosen.append(answer['answer'])
                question_serialized =  QuestionsSerializer(Question.objects.get(id=question.question.id)).data
                question_serialized['chosen'] = chosen

                quiz_serializer['questions'].append(question_serialized)
            response_data.append(quiz_serializer)
        if request.query_params['latest'] == 'true':
            response_data = response_data[-1]
        return Response(json.dumps(response_data))


class UserResults(APIView):

    def get(self, request, id):

        queryset = UserProgress.objects.filter(user_id=id).filter(is_finished=True)
        if not queryset:
            raise NotFound('You have not passed any tests')
        datetime_started = queryset.order_by('datetime_started').distinct('datetime_started')

        response_data = []
        for started in datetime_started:
            serializer = QuizSerializer(Quiz.objects.get(id=started.question.quiz.id)).data
            serializer['passed'] = started.datetime_started
            serializer['chains'] = Quiz.objects.filter(id=started.question.quiz.id).order_by('questions__chain').distinct('questions__chain').count()
            serializer['levels'] = Question.objects.filter(quiz__id=started.question.quiz.id).order_by('level').last().level
            response_data.append(serializer)

        return Response(response_data)