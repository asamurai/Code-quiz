from rest_framework.routers import SimpleRouter

from .views import TestCategoryViewSet

router = SimpleRouter()
router.register("categories", TestCategoryViewSet)

urlpatterns = router.urls
