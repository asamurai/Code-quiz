from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticated

from rest_framework.response import Response
from rest_framework import generics

from .serializers import QuizCategorySerializer, QuestionsSerializer, QuizSerializer, ChainSerializer
from .models import QuizCategory, Question, Quiz, Chain


class QuizCategoryViewSet(ModelViewSet):
    serializer_class = QuizCategorySerializer
    queryset = QuizCategory.objects.all()

    def list(self, request):
        serializer = QuizCategorySerializer(self.queryset, many=True)
        for data in serializer.data:
            data['top_quizzes'] = QuizSerializer(Quiz.objects.filter(category__id = data['id']).all()[:5],
                                                 many=True).data
        return Response(serializer.data)


class QuizViewSet(ModelViewSet):
    # permission_classes = (IsAuthenticated,) its for auth!!!
    serializer_class = QuizSerializer
    queryset = Quiz.objects.all()


class QuestionViewSet(ModelViewSet):
    serializer_class = QuestionsSerializer
    queryset = Question.objects.all()

    def list(self, request):
        serializer = QuestionsSerializer(self.queryset, many=True, partial=True)
        [data.pop('answers') for data in serializer.data]
        return Response(serializer.data)


class ChainsList(generics.ListCreateAPIView):
    queryset = Chain.objects.all()
    serializer_class = ChainSerializer

    def list(self, request, id):
        # Note the use of `get_queryset()` instead of `self.queryset`
        queryset = self.get_queryset().filter(chain_category__id=id)
        serializer = ChainSerializer(queryset, many=True)
        return Response(serializer.data)