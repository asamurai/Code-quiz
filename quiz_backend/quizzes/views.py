from django.shortcuts import get_object_or_404
from django.core.exceptions import ObjectDoesNotExist
from django.utils.timezone import now

from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import detail_route, list_route
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import generics
from rest_framework.exceptions import PermissionDenied

from .serializers import QuizCategorySerializer, QuestionsSerializer, QuizSerializer, ChainSerializer, \
    AnswerNestedSerializerForPassing, QuestionsSerializerForPassing, TopicSerializer, QuizNestedSerializer, QuizReadSerializer
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
        print(serializer.data)
        return Response(serializer.data)


class QuizViewSet(ModelViewSet):
    """ /quizzes
    GET quizzes, POST  and change quizzes with bearer auth
    """
    serializer_class = QuizReadSerializer
    queryset = Quiz.objects.all()
    http_method_names = ['get', 'post', 'head', 'put']

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
        if self.action in ['update', 'create']:
            permission_classes = [IsAuthenticated]
        else:
            permission_classes = []
        return [permission() for permission in permission_classes]

class QuestionViewSet(ModelViewSet):
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
        queryset = UserProgress.objects.filter(question__quiz__id=id).filter(user=request.user).all()
        # if user doesnt send answers on test
        if not queryset.filter(is_finished=False):
            # if user pass test first time
            questions = Question.objects.filter(level=1).order_by('?').distinct()
            print(questions)
            serializer = QuestionsSerializerForPassing(questions, many=True)
            for question in queryset:
                UserProgress.objects.create(question=question, user=request.user, datetime_started=now())
        elif queryset.filter(answers=None).all():
            # print('here2')
            questions = queryset.filter(answers=None).all()
        else:
            questions = Quiz.objects.filter(level=1)
            serializer = QuestionsSerializerForPassing(questions, many=True)
        return Response(serializer.data)

    def post(self, request, id):
        serializer = QuestionsSerializerForPassing(data=request.data, many=True)
        if serializer.is_valid(raise_exception=True):
            return Response({'ok': 'ok'})

    # def __distinct_by_chain(self, queryset):

