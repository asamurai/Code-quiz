from django.conf.urls import url
from django.conf.urls.static import static
from django.conf import settings

from rest_framework.routers import SimpleRouter

from .views import QuizCategoryViewSet, QuestionViewSet, QuizViewSet, ChainsList, QuestionList, \
    ChainsListAll, TopicViewSet

router = SimpleRouter()
router.register("categories", QuizCategoryViewSet)
router.register("questions", QuestionViewSet)
router.register("quizzes", QuizViewSet)
router.register("topic", TopicViewSet)

quizzes_filter_by_user = QuizViewSet.as_view({
    'get': 'get_queryset_by_user'
})

urlpatterns = [
    url(r'^chain/(?P<id>\d+)/$', ChainsList.as_view()),
    url(r'^chain/$', ChainsListAll.as_view()),
    url(r'^pass_quiz/(?P<id>\d+)/$', QuestionList.as_view()),
    url(r'^quizzes/by_user/(?P<id>\d+)/$', quizzes_filter_by_user, name='quizzes-filter-by-user')
]

urlpatterns += router.urls

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

