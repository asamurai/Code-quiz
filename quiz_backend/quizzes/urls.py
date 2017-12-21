from rest_framework.routers import SimpleRouter

from .views import QuizCategoryViewSet, QuestionViewSet, QuizViewSet

router = SimpleRouter()
router.register("categories", QuizCategoryViewSet)
router.register("questions", QuestionViewSet)
router.register("quizzes", QuizViewSet)

urlpatterns = router.urls
