from rest_framework.viewsets import ModelViewSet

from .serializers import TestCategorySerializer
from .models import TestCategory


class TestCategoryViewSet(ModelViewSet):
    serializer_class = TestCategorySerializer
    queryset = TestCategory.objects.all()