from django.conf.urls import url

from rest_framework.routers import SimpleRouter
from rest_framework import generics

from .views import QuizCategoryViewSet, QuestionViewSet, QuizViewSet, ChainsList

router = SimpleRouter()
router.register("categories", QuizCategoryViewSet)
router.register("questions", QuestionViewSet)
router.register("quizzes", QuizViewSet)
# router.register("chains", ChainsList.as_view())

urlpatterns = [
    url(r'^chain/(?P<id>\d+)/$', ChainsList.as_view()),
]
urlpatterns += router.urls

