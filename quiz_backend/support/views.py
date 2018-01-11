from rest_framework.viewsets import ModelViewSet
from .models import SupportCategory, SupportTopic, Comment
# Create your views here.

from .serializers import SupportCategorySerializer, SupportReadTopicSerializer, SupportTopicSerializer, CommentSerializer


class CategoriesView(ModelViewSet):
    serializer_class =  SupportCategorySerializer
    queryset = SupportCategory.objects.all()
    http_method_names = ['get']


class ReadSupportTopicView(ModelViewSet):
    serializer_class = SupportReadTopicSerializer
    queryset = SupportTopic.objects.reverse()
    http_method_names = ['get']


class TopicView(ModelViewSet):
    serializer_class = SupportTopicSerializer
    queryset = SupportTopic.objects.reverse()


class CommentView(ModelViewSet):
    serializer_class = CommentSerializer
    queryset = Comment.objects.all()
