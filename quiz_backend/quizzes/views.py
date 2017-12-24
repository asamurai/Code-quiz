from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticated

from rest_framework.response import Response

from .serializers import QuizCategorySerializer, QuestionsSerializer, QuizSerializer
from .models import QuizCategory, Question, Quiz


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