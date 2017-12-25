from django.shortcuts import get_object_or_404

from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import generics

from .serializers import QuizCategorySerializer, QuestionsSerializer, QuizSerializer, ChainSerializer, \
    AnswerNestedSerializerForPassing, QuestionsSerializerForPassing, TopicSerializer, QuizNestedSerializer
from .models import QuizCategory, Question, Quiz, Chain, Topic


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
    # permission_classes = (IsAuthenticated,) its for auth!!!
    serializer_class = QuizNestedSerializer
    queryset = Quiz.objects.all()

    def list(self, request):
        serializer = QuizSerializer(self.queryset, many=True)
        return Response(serializer.data)


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


class QuestionList(APIView):
    ''' Implements passing quiz '''
    def get(self, request, id):
        # should be userprogress
        queryset = Question.objects.filter(quiz__id=id).all()
        serializer = QuestionsSerializerForPassing(queryset, many=True)
        return Response(serializer.data)

    def post(self, request, id):
        serializer = QuestionsSerializerForPassing(data=request.data, many=True)
        if serializer.is_valid(raise_exception=True):
            return Response({'ok': 'ok'})
