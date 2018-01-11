from django.db import models
from django.conf import settings


class SupportCategory(models.Model):
    name = models.CharField(max_length=128)

    def __str__(self):
        return self.name


class SupportTopic(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    name = models.CharField(max_length=128)
    description = models.TextField()
    category = models.ForeignKey(SupportCategory, on_delete=models.CASCADE, related_name='topics')
    rate = models.IntegerField(default=0)
    is_closed = models.BooleanField(default=False)
    created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name


class Comment(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    topic = models.ForeignKey(SupportCategory, on_delete=models.CASCADE, related_name='comemnts')
    rate = models.IntegerField(default=0)
    description = models.TextField()
    created = models.DateTimeField(auto_now_add=True)