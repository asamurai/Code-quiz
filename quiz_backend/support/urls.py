from django.conf.urls.static import static
from django.conf import settings

from rest_framework.routers import SimpleRouter
from .views import CategoriesView, ReadSupportTopicView, TopicView, CommentView

router = SimpleRouter()
router.register("categories", CategoriesView)
router.register("topic", ReadSupportTopicView)
router.register("add-topic", TopicView)
router.register("add-comment", CommentView)

urlpatterns = router.urls

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)