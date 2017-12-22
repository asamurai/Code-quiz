from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticated

from rest_framework.response import Response

from .serializers import QuizCategorySerializer, QuestionsSerializer, QuizSerializer
from .models import QuizCategory, Question, Quiz


class QuizCategoryViewSet(ModelViewSet):
    serializer_class = QuizCategorySerializer
    queryset = QuizCategory.objects.all()


class QuizViewSet(ModelViewSet):
    # permission_classes = (IsAuthenticated,) its for auth!!!
    serializer_class = QuizSerializer
    queryset = Quiz.objects.all()


class QuestionViewSet(ModelViewSet):
    serializer_class = QuestionsSerializer
    queryset = Question.objects.all()
