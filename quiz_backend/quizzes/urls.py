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

quizzes_filter_by_topic = QuizViewSet.as_view({
    'get': 'get_queryset_by_topic'
})

topic_filter_by_category = TopicViewSet.as_view({
    'get': 'get_queryset_by_category'
})

urlpatterns = [
    url(r'^chain/(?P<id>\d+)/$', ChainsList.as_view()),
    url(r'^chain/$', ChainsListAll.as_view()),
    url(r'^pass_quiz/(?P<id>\d+)/$', QuestionList.as_view()),
    url(r'^quizzes/by_user/(?P<id>\d+)/$', quizzes_filter_by_user, name='quizzes-filter-by-user'),
    url(r'^quizzes/by_topic/(?P<id>\d+)/$', quizzes_filter_by_topic, name='quizzes-filter-by-topic'),
    url(r'^topic/by_category/(?P<id>\d+)/$', topic_filter_by_category, name='topic-filter-by-category')
]

urlpatterns += router.urls

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

