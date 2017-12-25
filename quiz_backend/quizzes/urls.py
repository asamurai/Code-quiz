from django.conf.urls import url
from django.conf.urls.static import static
from django.conf import settings

from rest_framework.routers import SimpleRouter

from .views import QuizCategoryViewSet, QuestionViewSet, QuizViewSet, ChainsList, QuestionList

router = SimpleRouter()
router.register("categories", QuizCategoryViewSet)
router.register("questions", QuestionViewSet)
router.register("quizzes", QuizViewSet)


urlpatterns = [
    url(r'^chain/(?P<id>\d+)/$', ChainsList.as_view()),
    url(r'^pass_quiz/(?P<id>\d+)/$', QuestionList.as_view()),
]

urlpatterns += router.urls

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

