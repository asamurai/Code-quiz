from django.db import models
from django.conf import settings


class TestCategory(models.Model):
    name = models.CharField(max_length=128)
    description = models.TextField()


class Test(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    category = models.ForeignKey(TestCategory, on_delete=models.CASCADE)
    title = models.CharField(max_length=128)
    description = models.TextField()
    image = models.ImageField(null=True, upload_to='quiz_images/')
    created = models.DateTimeField(auto_now_add=True)
    modified = models.DateTimeField(auto_now=True)


class QuizChain(models.Model):
    test = models.ForeignKey(Test, on_delete=models.CASCADE)
    name = models.CharField(max_length=128)
    description = models.TextField(blank=True)
    source_url = models.URLField()
    color = models.CharField(max_length=6)


class Quiz(models.Model):
    test= models.ForeignKey(Test, on_delete=models.CASCADE)
    description = models.TextField()
    level = models.PositiveSmallIntegerField()
    chain = models.ManyToManyField(QuizChain)


class QuizAnswer(models.Model):
    answer = models.TextField()
    is_true = models.BooleanField()
    quiz = models.ForeignKey(Quiz, on_delete=models.CASCADE)


class UserProgress(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    answer = models.ForeignKey(QuizAnswer, on_delete=models.CASCADE)